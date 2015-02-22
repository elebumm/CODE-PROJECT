/**
 * Created by lewismenelaws on 15-02-21.
 */
var mongoose = require('mongoose');
var db = require('../db');

var Summary = db.model('Summary', {
    ID : { type : String, required : true },
    emp_2012 : { type : Number, required : true },
    emploi_growth : { type : Number, required : true },
    retire : { type : Number, required : true },
    replacement : { type : Number, required : true },
    j_openings : { type : Number, required : true },
    school_leavers : { type : Number, required : true },
    immigrant_labor : { type : Number, required : true },
    j_seekers_other : { type : Number, required : true },
    j_seekers_all : { type : Number, required : true },
    labor_requirements_e : { type : String, required : true },
    labor_requirements_f : { type : String, required : true },
    final_assessment_e : { type : String, required : true },
    final_assessment_f : { type : String, required : true }
});

module.exports = Summary;