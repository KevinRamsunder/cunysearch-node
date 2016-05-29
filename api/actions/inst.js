import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import colors from 'colors';
import queue from '../utils/asyncQueue.js';
import mongo from '../utils/mongo.js';

export default function inst(req) {
  getDatabaseModel(callback => {
      const institutions = callback[0]; // list of insts
      const instList = callback[1]; // mongo doc object
      return Promise.resolve([institutions, instList]);
  });
}

function getDatabaseModel(callback) {
    let institutions = undefined;
    mongoose.model('School').find().lean().exec((err, instList) => {
        if(err) {
            console.log(err);
            callback(err);
        } else if(instList.length === 0) {
            mongo.populateDatabase(err => {
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
    });
}

function processModel(instList) {
    const institutions = [];

    for(let i = 0; i < instList.length; i++) {
        const collegeName = instList[i].institution.Name;
        const htmlKey = instList[i].institution.HtmlKey;
        const index = i;

        institutions.push({inst: collegeName, htmlKey, index: i});
    }

    return sortInstitutionList(institutions);
}

function sortInstitutionList(list) {
    list.sort((a, b) => {
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