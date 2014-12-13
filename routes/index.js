var express = require('express'),
    debug = require('debug')('chequeador'),
    router = express.Router();


var redirect = function(route) {
  return function(req, res) {
    res.redirect(route);
  };
};

var logout = function(req, res, next) {
  req.logout();
  next();
};

router.get('/', function(req, res) {
    res.render('index', { 
        title: 'Express',
        user: req.user
    });
});

router.get('/logout', logout, redirect('/'));


module.exports = router;
