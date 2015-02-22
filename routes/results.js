var express = require('express');
var router = express.Router();
var projections = require('../models/emp_projections');

/* GET contact page. */
router.get('/', function(req, res, next) {
    res.render('results', {title: 'ContactDream Results'});
});

router.get('/chartDemo/:id', function (req, res, next) {

    //console.log(req.params.id);
    //console.log(typeof(req.params.id));

    var x = req.params.id;

    console.log(x);
    console.log(typeof(x));

    projections.find({ ID : req.params.id }, function (err, docs) {
        res.json(docs);
    });
});

module.exports = router;