var mongoose = require('mongoose');
var config = require('./config.js');
var InfoBot = require('./info-bot.js');
var CronJob = require('cron').CronJob;
var async = require('async');

// connect to database
mongoose.connect('mongodb://localhost/' + config.mongo.db);

new CronJob('00 00 2 * * 3', function() {
    populateDatabase(function(err) {
        if(err) {
            console.log('Cron Job unable to run.');
        } else {
            console.log('Cron Job ran successfully.');
        }
    });
}, null, true, 'America/New_York');

// database schema
var School = mongoose.model("School", {
    institution: {Name: String, HtmlKey: String},
    term: [{Name: String, HtmlKey: String}],
    department: [{Name: String, HtmlKey: String}]
});

function loadAndStoreServerData(originalCallback) {
    // load institutions from cuny
    var bot = new InfoBot(function(thisRef) {
        thisRef.getInstitutions(function(institutions) {
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
    var i = 0;

    async.whilst(
        function() { return i < institutions.length; },
        function(newCallback) {
            extractInformation(institutions[i], thisRef, newCallback);
            i++;
        },
        function() {
            originalCallback();
        }
    );
}

function extractInformation(singleInstitution, thisRef, newCallback) {
    // extract terms and depts of each institution
    thisRef.parseXML(singleInstitution, function(inst, parserObject) {
        var term = thisRef.getTerms(parserObject);
        var dept = thisRef.getDepts(parserObject);

        if(term.length === 0 && dept.length === 0) {
            console.log("Error retrieving term and dept data from the server");
            return;
        }

        var object = generateObject(inst, term, dept);

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
    var school = new School;

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
    object.save(function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log(object.institution.Name + " added to db.");
        }

        newCallback();
    });
}

function populateDatabase(callback) {
    // drop collection and re-populate with new data
    School.remove({}, function(err) {
        if(err) {
            console.log("Unable to drop collection: School");
            callback("error");
        } else {
            loadAndStoreServerData(callback);
        }
    });
}

module.exports = {
    populateDatabase: populateDatabase
};