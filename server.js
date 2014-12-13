var express = require('express'),
    passport = require('passport'),
    debug = require('debug')('chequeador'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session');
    routes = require('./routes/index'),
    users = require('./routes/users'),
    auth = require('./auth'),
    api = require('./routes/api'),
    app = express();

app.set('views', path.join(__dirname, 'views'));
//app.set('views', path.join(__dirname, 'client/app'));
app.set('view engine', 'hjs');


//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));

app.use(session({ secret: 'bl33d1ngums' }));

app.use(passport.initialize());
app.use(passport.session());

//app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'client/app')));
app.use('/modules', express.static(path.join(__dirname, 'client/app/modules')));

//app.use('/users', users);
app.use('/api', api);

app.use('/auth', auth());

app.use('/', routes);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {

        debug(err.message);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


require('./models');


module.exports = app;
