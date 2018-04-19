var express = require('express');
var router = express.Router();
var logger = require('log4js').getLogger("routes/index.js");


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
    logger.debug("access to web index");
});

module.exports = router;