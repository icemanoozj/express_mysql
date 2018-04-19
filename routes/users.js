var express = require('express');
var router = express.Router();
//var logger = require("../utils/logger").getLogger('users.js');
var logger = require('log4js').getLogger("routes/users.js");

var models = require("../models");
var Sequelize = require("sequelize");

/* GET users listing. */
router.get('/', function(req, res, next) {
    var cond = req.body;
    logger.error("error test");
    models.user.findAll({}).then(result => {
        res
            .type("json")
            .status(200)
            .json(result);
    });
});

/* GET one user. */
router.get('/:id', function(req, res, next) {
    models.user.findById(req.params.id).then(result => {
        if (result) {
            res
                .type("json")
                .status(200)
                .json(result);
        } else {
            res
                .type("json")
                .status(200)
                .json({ response: "can't find user." });
        }
    });
});

/* add user. */
router.post('/', function(req, res, next) {
    var user = req.body;
    //console.log(logger);
    logger.debug(JSON.stringify(user));
    models.user.create({
            name: user.name,
            dept: user.dept
        }).then(function(result) {
            res
                .type("json")
                .status(200)
                .json(result);
        })
        .catch(function(err) {
            console.log(err.name);
            res.status(500).json(err);
        });
});

/* update user. */
router.put('/:id', function(req, res, next) {
    var user = req.body;
    models.user.update(
            user, {
                where: {
                    id: req.params.id
                }
            }
        )
        .then(function(result) {
            res
                .type("json")
                .status(200)
                .json(result);
        });
});

/* delete user. */
router.delete('/:id', function(req, res, next) {
    models.user
        .destroy({
            where: {
                id: req.params.id
            }
        })
        .then(function(result) {
            res
                .type("json")
                .status(200)
                .json(result);
        });
});

module.exports = router;