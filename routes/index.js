var express = require('express');
var router = express.Router();
var converter = require('json-2-csv');
var http = require('http');
var fs = require('fs');
var request = require('request');

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Dream Job'});
});

/* GET about page. */
router.get('/about', function(req, res, next) {
    res.render('about', {title: 'About Dream Job'});
});

/* GET about page. */
router.get('/contact', function(req, res, next) {
    res.render('contact', {title: 'Contact Dream Job'});
});

//router.get('/test', function(req, res, next) {
//    request.get('http://www.cbsa-asfc.gc.ca/bwt-taf/bwt-eng.csv', function (error, response, body) {
//        if (!error && response.statusCode == 200) {
//            var csv = body;
//            //console.log(csv);
//
//            var options = {"DELIMITER" : {"FIELD" : ";;"}};
//
//            var csv2jsonCallback = function (err, json) {
//                if (err)
//                {
//                    res.json({
//                        "error" : "ERROR, please contact us to see what's wrong!"
//                    });
//                };
//                res.json(json);
//                console.log(typeof json);
//                console.log(json.length);
//                console.log(json);
//            }
//
//            converter.csv2json(csv, csv2jsonCallback, options);
//        }
//    });
//});

module.exports = router;
