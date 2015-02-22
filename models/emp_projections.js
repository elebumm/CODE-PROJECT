/**
 * Created by lewismenelaws on 15-02-21.
 */
var mongoose = require('mongoose');
var db = require('../db');

var emp_projections = db.model('emp_projections', {
    ID : { type : String, required : true },
    p_2013: { type : Number, required : true },
    p_2014: { type : Number, required : true },
    p_2015: { type : Number, required : true },
    p_2016: { type : Number, required : true },
    p_2017: { type : Number, required : true },
    p_2018: { type : Number, required : true },
    p_2019: { type : Number, required : true },
    p_2020: { type : Number, required : true },
    p_2021: { type : Number, required : true },
    p_2022 : { type : Number, required : true },
    p_2023 : { type : Number, required : true }
});

module.exports = emp_projections;