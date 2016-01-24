var mongoose = require('mongoose');
var config = require('./config.js');
var InfoBot = require('./info-bot.js');

mongoose.connect('mongodb://localhost/' + config.mongo.db);

var School = mongoose.model("School", {
    institution: {Name: String, HtmlKey: String},
    term: [{Name: String, HtmlKey: String}],
    department: [{Name: String, HtmlKey: String}]
});

var bot = new InfoBot(function() {
    // load institutions from cuny
    bot.getInstitutions(function(institutions) {
        commitInstitutionToDatabase(institutions);
    });
});

function commitInstitutionToDatabase(institutions) {
    // load modified page based on selected institution
    for(var i = 0; i < institutions.length; i++) {
        extractInformation(institutions[i]);
    }
}

function extractInformation(singleInstitution) {
    // extract terms and depts of each institution
    bot.parseXML(singleInstitution, function(inst, parserObject) {
        var term = bot.getTerms(parserObject);
        var dept = bot.getDepts(parserObject);

        var object = generateObject(inst, term, dept);
        commitObject(object);
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

function commitObject(object) {
    // commit object to database
    object.save(function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log(object.institution.Name + " added to db.");
        }
    });
}