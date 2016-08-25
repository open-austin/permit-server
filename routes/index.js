var express = require('express');
var router = express.Router();
var questions = require('../lib/questions');
var permits = require('../lib/permits');
var geo = require('../lib/geo');

router.get('/questions/:id', function(req, res, next) {
  if (questions[req.params.id]) {
    return res.json(questions[req.params.id]);
  }
  res.status(404).send('Question not found');
});

router.get('/questions/', function (req, res, next) {
    return res.json(questions);
});

router.get('/permits/:id', function(req, res, next) {
  if (permits[req.params.id]) {
    return res.json(permits[req.params.id]);
  }
  res.status(404).send('Permit not found');
});

router.get('/prereqs/:id', function(req, res, next) {
  if (prereqs[req.params.id]) {
    return res.json(prereqs[req.params.id]);
  }
  res.status(404).send('Permit not found');
});

router.get('/api/zones', function(req, res, next) {
  if (!req.query.address) {
    return res.status(500).send('address query is required');
  }

  geo.getAddressCandidates(req.query.address, function(err, response) {
    if (err) return next(err);
    geo.inHistoricalDistrict(response.candidates[0].location, function(err, isInHistoricalDistrict) {
      if (err) return next(err);
      res.json({
        address: req.query.address,
        location: response.candidates[0].location,
        historic_district: isInHistoricalDistrict
      });
    });
  });
});


module.exports = router;
