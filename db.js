/**
 * Created by Steven Lambe on 2/21/15.
 */
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var mongodbUri = 'mongodb://node:node@ds045521.mongolab.com:45521/testdb';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connect(mongooseUri, function() {
    console.log('mongodb connected');
});
module.exports = mongoose;