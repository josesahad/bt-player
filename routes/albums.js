var express = require('express');
var router = express.Router();

/* GET albums. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;
