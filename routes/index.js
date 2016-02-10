var express = require('express');
var router = express.Router();
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Timestamp Microservice' });
});

router.get('/*', function(req, res, next) {
  var data = req.path.slice(1, req.path.length);
  var unix = "", natural = "";
  
  if (isNaN(data)) {
    data = decodeURI(data);
    var day = moment(data, 'MMM D YYYY');
  }
  else {
    day = moment(data, 'X');
  }
  
  natural = moment(day).format('LL');
  unix = moment(day).format('X');
  
  if (natural === "Invalid date" || unix === "Invalid date") {
    unix = null;
    natural = null;
  }
  
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({unix: unix, natural: natural}));
});

module.exports = router;
