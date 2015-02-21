/**
 * Created by c0628412 on 2/20/15.
 */
var express = require('express');
var router = express.Router();
var converter = require('json-2-csv');
var http = require('http');
var fs = require('fs');
var request = require('request');

router.get('/', function(req, res, next) {
    res.render('test', { test: "Hello this is a test and this is successful if you see it!"});
});

module.exports = router;