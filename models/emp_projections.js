/**
 * Created by lewismenelaws on 15-02-21.
 */
var mongoose = require('mongoose');
var db = require('../db');

var emp_projections = db.model('epm_projections', {
    ID : { type : String, required : true },
    year1 : { type : Number, required : true },
    year2 : { type : Number, required : true },
    year3 : { type : Number, required : true },
    year4 : { type : Number, required : true },
    year5 : { type : Number, required : true },
    year6 : { type : Number, required : true },
    year7 : { type : Number, required : true },
    year8 : { type : Number, required : true },
    year9 : { type : Number, required : true },
    year10 : { type : Number, required : true },
    year11 : { type : Number, required : true }
});

module.exports = emp_projections;