/**
 * Created by Steven Lambe on 2/21/15.
 */
 var mongoose = require('mongoose');
mongoose.connect('mongodb://tester:tester@ds045521.mongolab.com:45521/testdb', function() {
    console.log('mongodb connected');
});
module.exports = mongoose;