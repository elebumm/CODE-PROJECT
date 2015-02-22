var express = require('express');
var router = express.Router();

/* GET contact page. */
router.get('/', function(req, res, next) {
    res.render('results', {title: 'DreamJob Results'});
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

/* ------------- COPS OCCUPATIONAL GROUPING -------------------- */

// All Employment Categories and Respective Sub-Categories
router.get('/jobCat', function(req, res, next) {
    res.render('results', {title: 'DreamJob Results', jobs: array});
});

/* --------------- JOB VACANCY STATISTICS ---------------------- */

// All Annual Job Vacancies by Year
router.get('/annJobVacYr/:year', function(req, res, next) {
    res.render('results', {title: 'DreamJob Results', years: array, numVacancies: array});
});

// All Annual Job Vacancies for Specified ID
router.get('/annJobVacID/:jobID', function(req, res, next) {
    res.render('results', {title: 'DreamJob Results', job: name, numVacancies: array});
});

// All Annual Job Vacancies for Specified ID for Specified Year
router.get('/annJobVacYrID/:jobID/:year', function(req, res, next) {
    res.render('results', {title: 'DreamJob Results', job: name, year: year, numVacancies: array});
});

// All Annual Job Vacancies for Specified ID for Year Range
router.get('/annJobVacYrIDRan/:jobID/:startYear/:endYear', function(req, res, next) {
    res.render('results', {title: 'DreamJob Results', job: name, years: array, numVacancies: array});
});


// ANNUAL EMPLOYMENT PROJECTIONS
// ----------------------------------------------------------------------------------------

// Annual Employment Projections All Data
router.get('/annEmpProAll/', function(req, res, next) {
    var value = {

    }

    res.render('results', {title: 'DreamJob Results', results: value});
});

// Annual Employment Projections Using Year Range (All Job Categories)
router.get('/annEmpProRan/:startYear/:endYear', function(req, res, next) {
    res.render('results', {title: 'DreamJob Results', startYear: value, endYear: value});
});

// Annual Employment Projections Using Job Category (All years)
router.get('/annEmpProCat/:cat/startYear/:endYear', function(req, res, next) {
    res.render('results', {title: 'DreamJob Results', jobCat: value});
});

// Annual Employment Projections Using Job Category AND Year Range
router.get('/annEmpProCatRan/:cat/startYear/:endYear', function(req, res, next) {
    res.render('results', {title: 'DreamJob Results', jobCat: value, startYear: value, endYear: value});
});

// REPLACEMENT DEMAND IN THE FORM OF ANNUAL RETIREMENT
// ---------------------------------------------------------------------------------------

// Annual Retirement Projections All Data
router.get('/annRetProAll/', function(req, res, next) {
    res.render('results', {title: 'DreamJob Results', results: value});
});

// Annual Retirement Projections Using Year Range (All Job Categories)
router.get('/annRetProRan/:startYear/:endYear', function(req, res, next) {
    res.render('results', {title: 'DreamJob Results', startYear: value, endYear: value});
});

// Annual Retirement Projections Using Job Category (All years)
router.get('/annRetProCat/:cat/startYear/:endYear', function(req, res, next) {
    res.render('results', {title: 'DreamJob Results', jobCat: value});
});

// Annual Retirement Projections Using Job Category AND Year Range
router.get('/annRetProCatRan/:cat/startYear/:endYear', function(req, res, next) {
    res.render('results', {title: 'DreamJob Results', jobCat: value, startYear: value, endYear: value});
});

// SUMMARY OF CUMULATIVE JOB OPENINGS AND JOB SEEKRS
// ---------------------------------------------------------------------------------------
// URL args:
//  The first two are Job Category, and Employment in 2012.
//  The rest cover 2013-2022 and are as follows:
//      Employment Growth, Retirements, Other Replacement Demand, Job Openings,
//      Job Seekers (School Leavers), Job Seekers (Immigrants), Job Seekers (Other Categories), Job Seekers (All Combined),
//  The last two are listed as either Balance, Shortage, OR Surplus and are:
//      Assessment of Labour Market Conditions (from 2010-2012), AND
//      Projected Final Assessment of Labour Market Conditions (from 2013-2022)
// NOTE: The last column, and the 3rd last column in the dataset are French, and will not be used.
router.get('/openingsAndSeekers/:cat/:emp2012/:empGrow/:ret/:othOpen/:allOpen/:school/:immi/:othSeek/:allSeek/:lmdAss/:lmdProj'), function(req, res, next) {
    res.render('results', {title: 'DreamJob Results', jobCat: value, columns: obj});
}


module.exports = router;
