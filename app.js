var express = require('express');
var server = require('./bin/server');
var config = require('./config/index');
var log = require('./lib/logger')(module);
var i18n = require('i18n');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var favicon = require('serve-favicon');
var errorHandler = require('errorhandler');
var mongoose = require('./bin/mongoose');
var HttpError = require('./bin/errorHandler').HttpError;

var app = express();

app.engine('ejs', require('ejs-locals'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

i18n.configure(config.get('i18n'));

app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(i18n.init);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var MongoStore = require('connect-mongo')(session);
app.use(session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(require('./lib/loadUser'));
app.use(require('./bin/errorHandler').sendHttpError);

app.use('/', require('./routes/router'));

// Error handlers

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(404);
});

app.use(function(err, req, res, next) {
    if (typeof err == 'number') {
        err = new HttpError(err);
    }

    if (err instanceof HttpError) {
        res.sendHttpError(err);
    } else {
        if (app.get('env') == 'development') {
            app.use(errorHandler())(err, req, res, next);
        } else {
            log.error(err);
            err = new HttpError(500);
            res.sendHttpError(err);
        }
    }
});

server(app);