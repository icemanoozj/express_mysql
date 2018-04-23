var express = require('express');
var router = express.Router();
//var logger = require("../utils/logger").getLogger('users.js');
var logger = require('log4js').getLogger("routes/users.js");

var models = require("../models");
var Sequelize = require("sequelize");

/* GET users listing. 同步写法 */
router.get('/', function(req, res, next) {
    //url后面带的参数（如/users/?id1=4&id2=7）
    var cond = req.query;
    logger.debug("query params:" + JSON.stringify(cond));
    // logger.error("error test");
    models.user.findAll({}).then(result => {
        res
            .type("json")
            .status(200)
            .json(result);
    });
});

/* GET users listing. 异步写法 + 参数获取 */
router.get('/async', async function(req, res, next) {
    //url后面带的参数（如/users/?id1=4&id2=7）
    var cond = req.query;
    logger.debug("query params:" + JSON.stringify(cond));
    var id1Obj = await models.user.findById(cond.id1);
    var id2Obj = await models.user.findById(cond.id2);
    var rsArray = [id1Obj, id2Obj];
    res
        .type("json")
        .status(200)
        .json(rsArray);
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
    console.log(models.user.validate());
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