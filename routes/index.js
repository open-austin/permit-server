var express = require('express');
var router = express.Router();
var questions = require('../lib/questions');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/questions/:id', function(req, res, next) {
  if (questions[req.params.id]) {
    return res.json(questions[req.params.id]);
  }
  res.status(404).send('Question not found');
});

module.exports = router;
