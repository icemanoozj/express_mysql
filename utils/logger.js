var path = require("path");
var fs = require('fs');
const log4js = require('log4js');

log4js.configure({
    appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});

module.exports = log4js;