/**
 * Created by lewismenelaws on 15-02-21.
 */

var mongoose = require('mongoose');
var db = require('../db');

var vacancy_stats = db.model('vacancy_stats', {
    ref_date : {type : double, required : true },
    geo : {type : String, required : true},
    stats : {type : String, required : true},
    naics : {type : String, required : true},
    vector : {type : String, required : true},
    coordinate : {type : String, required : true},
    value : {type : double, required : true}
});

module.exports = vacancy_stats;