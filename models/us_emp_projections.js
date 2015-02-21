/**
 * Created by lewismenelaws on 15-02-21.
 */

var mongoose = require('mongoose');
var db = require('../db');

var us_emp_projections = db.model('us_emp_projections', {
    title : {type : String, required : true },
    soc_code : {type : String, required : true },
    emp_2012 : {type : double, required : true },
    emp_2022 : {type : double, required : true },
    n_in_thousands : {type: double, required : true },
    percent : {type : double, required : true },
    openings_due : {type : double, required : true },
    median_2012 : {type : double, required: true },
    entry_level_e : {type : String, required : true },
    work_experience : {type : String, required : true},
    on_job_training : {type : String, required : true}
});

module.exports = us_emp_projections;

