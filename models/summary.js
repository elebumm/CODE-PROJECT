/**
 * Created by lewismenelaws on 15-02-21.
 */
var mongoose = require('mongoose');
var db = require('../db');

var summary = db.model('summary', {
    ID : { type : String, required : true },
    emp_2012 : { type : double, required : true },
    emploi_growth : { type : double, required : true },
    retire : { type : double, required : true },
    replacement : { type : double, required : true },
    j_openings : { type : double, required : true },
    school_leavers : { type : double, required : true },
    immigrant_labor : { type : double, required : true },
    j_seekers_other : { type : double, required : true },
    j_seekers_all : { type : double, required : true },
    labor_requirements_e : { type : String, required : true },
    labor_requirements_f : { type : String, required : true },
    final_assessment_e : { type : String, required : true },
    final_assessment_f : { type : String, required : true }
});

module.exports = summary;