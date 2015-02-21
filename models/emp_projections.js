/**
 * Created by lewismenelaws on 15-02-21.
 */
var mongoose = require('mongoose');
var db = require('../db');

var emp_projections = db.model('epm_projections', {
    ID : { type : String, required : true },
    year1 : { type : double, required : true },
    year2 : { type : double, required : true },
    year3 : { type : double, required : true },
    year4 : { type : double, required : true },
    year5 : { type : double, required : true },
    year6 : { type : double, required : true },
    year7 : { type : double, required : true },
    year8 : { type : double, required : true },
    year9 : { type : double, required : true },
    year10 : { type : double, required : true },
    year11 : { type : double, required : true }
});

module.exports = emp_projections;