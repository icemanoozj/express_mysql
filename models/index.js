"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
//var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..', 'config', 'db.json'));
config.define = {
    underscored: true,
    timestamps: true,
    paranoid: true,
    freezeTableName: true
};
if (process.env.DATABASE_URL) {
    var sequelize = new Sequelize(process.env.DATABASE_URL, config);
} else {
    var sequelize = new Sequelize(config.database, config.username, config.password, config);
}
var db = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object
    .keys(db)
    .forEach(function(modelName) {
        if ("associate" in db[modelName]) {
            db[modelName].associate(db);
        }
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Relations
//db.access_log.belongsTo(db.url);
//db.url.hasOne(db.access_log);
//db.posts.hasMany(db.comments);  
//db.posts.belongsTo(db.users);  
//db.users.hasMany(db.posts);

module.exports = db;