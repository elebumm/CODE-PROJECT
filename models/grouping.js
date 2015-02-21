/**
 * Created by Steven Lambe on 2/21/15.
 */
var db = require('../db');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubcategoriesSchema = new Schema({
    ID : String,
    Name : String
});

var Grouping = db.model('Grouping', {
    catID : { type : String, required : true },
    catName : { type : String, required : true },
    subcategories : [SubcategoriesSchema]
});

module.exports = Grouping;