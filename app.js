var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

//var logger = require('morgan');
var log4js = require('log4js');
var log = log4js.getLogger("app.js");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// access 日志的格式
// create a write stream (in append mode) 以下可以在生产环境打开
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
// app.use(morgan('combined', {stream: accessLogStream}))
//app.use(logger(':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length]'));

app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;