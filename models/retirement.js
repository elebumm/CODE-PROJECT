/**
 * Created by lewismenelaws on 15-02-21.
 */
var mongoose = require('mongoose');
var db = require('.../db');

var retirement = db.model('retirement', {
    ID : { type: String, required : true },
    r_2013 : {type : double, required : true },
    r_2014 : {type : double, required : true },
    r_2015 : {type : double, required : true },
    r_2016 : {type : double, required : true },
    r_2017 : {type : double, required : true },
    r_2018 : {type : double, required : true },
    r_2019 : {type : double, required : true },
    r_2020 : {type : double, required : true },
    r_2021 : {type : double, required : true },
    r_2022 : {type : double, required : true }
});

module.exports = retirement;