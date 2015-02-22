/**
 * Created by lewismenelaws on 15-02-21.
 */
var mongoose = require('mongoose');
var db = require('../db');

var retirement = db.model('retirement', {
    ID : { type: String, required : true },
    r_2013 : {type : Number, required : true },
    r_2014 : {type : Number, required : true },
    r_2015 : {type : Number, required : true },
    r_2016 : {type : Number, required : true },
    r_2017 : {type : Number, required : true },
    r_2018 : {type : Number, required : true },
    r_2019 : {type : Number, required : true },
    r_2020 : {type : Number, required : true },
    r_2021 : {type : Number, required : true },
    r_2022 : {type : Number, required : true }
});

module.exports = retirement;