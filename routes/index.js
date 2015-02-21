var express = require('express');
var router = express.Router();
var converter = require('json-2-csv');
var http = require('http');
var fs = require('fs');
var request = require('request');
var Grouping = require('../models/grouping');

var endOfLine = require('os').EOL;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DickBut' });
});

router.get('/dataPull', function(req, res, next) {
    request.get('http://www.edsc.gc.ca/ouvert-open/cesp-pcee/employment_emploi.csv', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var temp = body;

            var brokenCSV = temp.split(endOfLine);
            var elements = brokenCSV[0].split(",");

            var csv = "nCode";

            for(var i = 0; i < elements.length - 1; i++)
            {
                csv += "," + (2012 + i);
            }

            csv += endOfLine;

            csv += body;
            console.log(csv);

            var options = {"DELIMITER" : {
                "FIELD" : ","
            }};

            var csv2jsonCallback = function (err, json) {
                if (err)
                {
                    res.json({
                        "error" : "ERROR, please don't contact us to see what's wrong!"
                    });
                };
                res.json(json);
                console.log(typeof json);



                console.log(json.length);
                console.log(json);
            }

            converter.csv2json(csv, csv2jsonCallback, options);
        }
    });
});

router.get('/pullIDs', function(req, res, next) {
    request.get('http://www.edsc.gc.ca/ouvert-open/bca-seb/imt-lmi/NOC_occ_grouping_eng.csv', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var csv = body;

            var brokenCSV = csv.split(endOfLine);
            var subBroken;
            var subSubBroken;
            var subCategories;
            var testJSON = "[ ";

            for(var i = 0; i < brokenCSV.length; i++) {
                console.log(brokenCSV[i]);
                console.log(endOfLine);
                brokenCSV[i] = brokenCSV[i].replace(",\",\"", "\",\"");
                subBroken = brokenCSV[i].split(",\"");
                testJSON += "{ ";
                for(var j = 0; j < brokenCSV[i].length; j++)
                {
                    if(subBroken[j] == null || subBroken[j] == "undefined")
                    {
                        break;
                    }
                    else if(j == 0)
                    {
                        console.log("ID: " + subBroken[j]);
                        testJSON += "\"ID\" : \"" + subBroken[j] + "\",";
                    }
                    else if(j == 1)
                    {
                        subBroken[j] = subBroken[j].replace("\"", "");
                        console.log("Category Name: " + subBroken[j]);
                        testJSON += "\"CatName\" : \"" + subBroken[j] + "\",";
                    }
                    else
                    {
                        subBroken[j] = subBroken[j].replace("\"", "");
                        console.log("Subcategories: " + endOfLine);
                        testJSON += "\"Subcategories\" : [ ";
                        subSubBroken = subBroken[j].split(";");

                        for(var k = 0; k < subSubBroken.length; k++)
                        {
                            //console.log(subSubBroken.length);
                            //console.log(subSubBroken);

                            if(subSubBroken[k] != null && subSubBroken[k] != "undefined")
                            {
                                console.log("\t" + subSubBroken[k]);
                                subCategories = subSubBroken[k].split(/-(.+)?/);
                                console.log("\tID: " + subCategories[0].trim() + "\tName: " + subCategories[1].trim());
                                testJSON += "{\"ID\" : \"" + subCategories[0].trim() + "\", \"Name\" : \"" + subCategories[1].trim() + "\"},";
                            }
                            else
                            {
                                break;
                            }
                        }

                        testJSON = testJSON.substr(0,testJSON.length - 1);
                        testJSON += " ]";
                    }
                }
                console.log(endOfLine);
                testJSON += " },";
            }
            testJSON = testJSON.substr(0,testJSON.length - 1);
            testJSON += " ]";
            var finalJSON = JSON.parse(testJSON);
            res.json(finalJSON);
        }
        else
        {
            res.json({
                "ERROR" : "ERROR! This shit didn't work, get fucked son!"
            });
        }
    });
});

module.exports = router;
