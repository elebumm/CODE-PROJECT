var express = require('express');
var router = express.Router();

/* GET contact page. */
router.get('/', function(req, res, next) {
    res.render('results', {title: 'DreamJob Results'});
});

/* ------------- COPS OCCUPATIONAL GROUPING -------------------- */

// All Employment Categories and Respective Sub-Categories
router.get('/jobCat', function(req, res, next) {
    res.render('results', {title: 'DreamJob Results', jobs: array});
})

/* --------------- JOB VACANCY STATISTICS ---------------------- */

// All Annual Job Vacancies by Year
router.get('/annJobVacYr/:year', function(req, res, next) {
    res.render('results', {title: 'DreamJob Results', years: array, numVacancies: array});
})

// All Annual Job Vacancies for Specified ID
router.get('/annJobVacID/:jobID', function(req, res, next) {
    res.render('results', {title: 'DreamJob Results', job: name, numVacancies: array});
})

// All Annual Job Vacancies for Specified ID for Specified Year
router.get('/annJobVacYrID/:jobID/:year', function(req, res, next) {
    res.render('results', {title: 'DreamJob Results', job: name, year: year, numVacancies: array});
})

// All Annual Job Vacancies for Specified ID for Year Range
router.get('/annJobVacYrIDRan/:jobID/:startYear/:endYear', function(req, res, next) {
    res.render('results', {title: 'DreamJob Results', job: name, years: array, numVacancies: array});
})


module.exports = router;

