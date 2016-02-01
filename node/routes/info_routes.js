var queue = require('../server/async');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var colors = require('colors');
var mongo = require('../server/mongo');

// create routes for handling http requests
var info_routes = express.Router();

// include middleware for parsing json
info_routes.use(bodyParser.json());

info_routes.get('/inst', function(req, res) {
    getDatabaseModel(function(callback) {
        var institutions = callback[0]; // list of insts
        var instList = callback[1]; // mongo doc object
        res.send([institutions, instList]);
    });
});

function getDatabaseModel(callback) {
    mongoose.model('School').find().lean().exec(function(err, instList) {
        if(err) {
            console.log(err);
            callback(err);
        } else {
            if(instList.length === 0) {
                mongo.populateDatabase(function(err) {
                    if(err) {
                        console.log('Unable to populate database');
                        return;
                    } else {
                        institutions = processModel(instList);
                        callback([institutions, instList]);
                    }
                });
            } else {
                institutions = processModel(instList);
                callback([institutions, instList]);
            }
        }
    });
}

function processModel(instList) {
    var institutions = [];

    for(var i = 0; i < instList.length; i++) {
        var collegeName = instList[i].institution.Name;
        var htmlKey = instList[i].institution.HtmlKey;
        var index = i;

        institutions.push({inst: collegeName, htmlKey: htmlKey, index: i});
    }

    return sortInstitutionList(institutions);
}

function sortInstitutionList(list) {
    list.sort(function(a, b) {
        if (a.inst > b.inst) {
            return 1;
        } else if(a.inst < b.inst) {
            return -1;
        } else {
            return 0;
        }
    });

    return list;
}

module.exports = info_routes;