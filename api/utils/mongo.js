import async from 'async';
import mongoose from 'mongoose';

import config from './config.js';
import InfoBot from './infoBot.js';

// connect to database
mongoose.connect('mongodb://localhost/' + config.mongo.db);

// database schema
const School = mongoose.model("School", {
  institution: {Name: String, HtmlKey: String},
  term: [{Name: String, HtmlKey: String}],
  department: [{Name: String, HtmlKey: String}]
});

function loadAndStoreServerData(originalCallback) {
  // load institutions from cuny
  const bot = new InfoBot(thisRef => {
    thisRef.getInstitutions(institutions => {
      commitInstitutionToDatabase(institutions, thisRef, originalCallback);
    });
  });
}

function commitInstitutionToDatabase(institutions, thisRef, originalCallback) {
  if(institutions.length === 0) {
    console.log('Error retrieving institution data from the server.');
    return;
  }

  // load modified page based on selected institution
  let i = 0;

  async.whilst(
    () => i < institutions.length,
    newCallback => {
      extractInformation(institutions[i], thisRef, newCallback);
      i++;
    },
    () => {
      originalCallback();
    }
  );
}

function extractInformation(singleInstitution, thisRef, newCallback) {
  // extract terms and depts of each institution
  thisRef.parseXML(singleInstitution, (inst, parserObject) => {
    const term = thisRef.getTerms(parserObject);
    const dept = thisRef.getDepts(parserObject);

    if(term.length === 0 && dept.length === 0) {
      console.log("Error retrieving term and dept data from the server");
      return;
    }

    const object = generateObject(inst, term, dept);

    if(object.institution.Name === undefined || object.institution.HtmlKey === undefined) {
      console.log('Error retrieving institution data from the server.');
      return;
    }

    if(object.term.length === 0 && object.dept.length === 0) {
      console.log("Error retrieving term and dept data from the server");
      return;
    }

    commitObject(object, newCallback);
  });
}

function generateObject(inst, term, dept) {
  // put all information in schema object
  const school = new School;

  school.institution = {Name: inst.school, HtmlKey: inst.htmlKey};

  for(var i = 0; i < term.length; i++) {
    school.term.push({Name: term[i].term, HtmlKey: term[i].htmlKey});
  }

  for(var i = 0; i < dept.length; i++) {
    school.department.push({Name: dept[i].dept, HtmlKey: dept[i].htmlKey});
  }

  return school;
}

function commitObject(object, newCallback) {
  // commit object to database
  object.save(err => {
    if(err) {
      console.log(err);
    } else {
      console.log(`${object.institution.Name} added to db.`);
    }

    newCallback();
  });
}

function populateDatabase(callback) {
  // drop collection and re-populate with new data
  School.remove({}, err => {
    if(err) {
      console.log("Unable to drop collection: School");
      callback("error");
    } else {
      loadAndStoreServerData(callback);
    }
  });
}

export default {
  populateDatabase,
  School
};