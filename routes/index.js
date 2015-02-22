var express = require('express');
var router = express.Router();
var converter = require('json-2-csv');
var http = require('http');
var fs = require('fs');
var request = require('request');
var Grouping = require('../models/grouping');
var retirement = require('../models/retirement');
var emp_projections = require('../models/emp_projections');
var endOfLine = require('os').EOL;
var vacancy_stats = require('../models/vacancy_stats');
var Converter = require("csvtojson").core.Converter;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DreamJob | Youth Employment'});
});

/* GET about page. */
router.get('/about', function(req, res, next) {
    res.render('about', {title: 'About DreamJob'});
});

/* GET about page. */
router.get('/contact', function(req, res, next) {
    res.render('contact', {title: 'ContactDream Job'});
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

                //var counter = 0;
                //
                //for(var i = 0; i < json.length; i++)
                //{
                //    counter++;
                //}

                res.json(json);
                console.log(typeof json);
                console.log(json);
                //console.log(counter);
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

            for(var i = 0; i < finalJSON.length; i++)
            {
                if(typeof(finalJSON[i].ID) != "undefined")
                {
                    var group = new Grouping({
                        catID: finalJSON[i].ID,
                        catName: finalJSON[i].CatName
                    });

                    console.log(finalJSON[i].Subcategories);

                    if (finalJSON[i].Subcategories.length > 0) {
                        for (var j = 0; j < finalJSON[i].Subcategories.length; j++) {
                            group.subcategories.push(finalJSON[i].Subcategories[j]);
                        }
                    }

                    group.save();
                    console.log("Item " + i + " insterted.");
                    //console.log(finalJSON[i]);
                }
            }

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


router.get('/pullRetirement', function(req, res, next) {
    request.get('http://www.edsc.gc.ca/ouvert-open/cesp-pcee/retirements_retraites.csv', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var temp = body;

            var brokenCSV = temp.split(endOfLine);
            var elements = brokenCSV[0].split(",");

            var csv = "nCode";

            for(var i = 0; i < elements.length - 1; i++){
                csv += ",r_" + (2013 + i);
            }

            csv += endOfLine;

            csv += body;
            //console.log(csv);

            var options = {"DELIMITER" : {
                "FIELD" : ","
            }};

            var csv2jsonCallback = function (err, json) {
                if (err) {
                    res.json({
                        "error": "ERROR, something went wrong"
                    });
                }
                    for (var i = 0; i < json.length; i++) {
                        if (typeof(json[i].nCode) != "undefined") {
                            var group = new retirement({
                                ID: json[i].nCode,
                                r_2013: json[i].r_2013,
                                r_2014: json[i].r_2014,
                                r_2015: json[i].r_2015,
                                r_2016: json[i].r_2016,
                                r_2017: json[i].r_2017,
                                r_2018: json[i].r_2018,
                                r_2019: json[i].r_2019,
                                r_2020: json[i].r_2020,
                                r_2021: json[i].r_2021,
                                r_2022: json[i].r_2022
                            });

                            group.save();
                            console.log("Item " + i + " insterted.");
                            //console.log(finalJSON[i]);

                        }
                    }
                    res.json(json);
                    //console.log(typeof json);
                    //console.log(json);

            }
            converter.csv2json(csv, csv2jsonCallback, options);
    };

    });
});

router.get('/pullEmpProjection', function(req, res, next) {
    request.get('http://www.edsc.gc.ca/ouvert-open/cesp-pcee/employment_emploi.csv', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var temp = body;

            var brokenCSV = temp.split(endOfLine);
            var elements = brokenCSV[0].split(",");

            var csv = "nCode";

            for(var i = 0; i < elements.length - 1; i++){
                csv += ",r_" + (2013 + i);
            }

            csv += endOfLine;

            csv += body;
            //console.log(csv);

            var options = {"DELIMITER" : {
                "FIELD" : ","
            }};

            var csv2jsonCallback = function (err, json) {
                if (err) {
                    res.json({
                        "error": "ERROR, something went wrong"
                    });
                }
                for (var i = 0; i < json.length; i++) {
                    if (typeof(json[i].nCode) != "undefined") {
                        var group = new emp_projections({
                            ID: json[i].nCode,
                            r_2013: json[i].r_2013,
                            r_2014: json[i].r_2014,
                            r_2015: json[i].r_2015,
                            r_2016: json[i].r_2016,
                            r_2017: json[i].r_2017,
                            r_2018: json[i].r_2018,
                            r_2019: json[i].r_2019,
                            r_2020: json[i].r_2020,
                            r_2021: json[i].r_2021,
                            r_2022: json[i].r_2022,
                            r_2023: json[i].r_2023
                        });

                        group.save();
                        console.log("Item " + i + " insterted.");
                        //console.log(finalJSON[i]);

                    }
                }
                res.json(json);
                //console.log(typeof json);
                //console.log(json);

            }
            converter.csv2json(csv, csv2jsonCallback, options);
        };

    });
});

router.get('/pullVacancyStats', function(req, res, next) {



    var csvFileName="./temp/02840004-eng.csv";
    var fileStream=fs.createReadStream(csvFileName);
//new converter instance
    var csvConverter=new Converter({constructResult:true});

//end_parsed will be emitted once parsing finished
    csvConverter.on("end_parsed",function(json){
        //console.log(json); //here is your result json ob
        for (var i = 0; i < json.length; i++) {
            //console.log(json[i].Value);
            if (typeof(json[i].Ref_Date) != "undefined") {
                var group = new vacancy_stats({
                    ref_date: json[i].Ref_Date,
                    geo: json[i].GEO,
                    stats: json[i].STATS,
                    naics: json[i].NAICS,
                    vector: json[i].Vector,
                    coordinate: json[i].Coordinate,
                    value: json[i].Value
                });

                group.save();
                console.log("Item " + i + " insterted.");
                //console.log(finalJSON[i]);

            }
        }
        //res.json(json);
        //console.log(typeof json);
        //console.log(json);
    });

//read from file
    fileStream.pipe(csvConverter);





    //converter.csv2json(data, csv2jsonCallback, options);



});

module.exports = router;
