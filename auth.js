var passport = require('passport'),
    when = require('when'),
    config = require('./config/config.json'),
    keys = require('./config/keys.json'),
    debug = require('debug')('chequeador'),
    gravatar = require('gravatar'),
    express = require('express'),
    router = express.Router(),
    _ = require('underscore'),
    User = require('./models/user').User;


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {

    User.read({id: id}).then(function (result) {
        return done(null, result.toJSON());
    });

});


var keepReturnUrl = function(req, res, next) {
  if(!req.session) req.session = {};
    debug('Retorno a: '+req.url);
  req.session.back_url = (req.url) || '/';
  next();
};

var redirectReturnUrl = function(req, res) {
  var back_url = '/';
    debug('Session back: '+req.session.back_url);
  if (!_.isUndefined(req.session.back_url)) {
    back_url = req.session.back_url; 
    debug('Retorno a: '+back_url);
  }

  res.redirect(back_url);
};




module.exports = function() {

for(var strategy in keys) {

  (function(provider){

    router.get('/' + provider, passport.authenticate(provider), keepReturnUrl);

    router.get('/' + provider + '/callback', passport.authenticate(provider, { 
        failureRedirect: '/'
        //successRedirect: '/'
    }), redirectReturnUrl);

    var Strategy = require('passport-' + provider).Strategy;

    passport.use(new Strategy(keys[provider], function(token, tokenSecret, profile, done) {

      User.read({provider_id: profile.id, provider: provider}, {}).then(function(user) {
        function setPicture(){
          if(profile.photos && profile.photos.length && profile.photos[0].value) {
            user.picture =  profile.photos[0].value.replace('_normal', '_bigger');
          } else if(profile.provider == 'facebook') {
            user.picture = "https://graph.facebook.com/" + profile.id + "/picture";
            user.picture += "?width=73&height=73";
          } else {
            user.picture = gravatar.url(user.email || '', {s: '73'});
          }

          user.picture = user.picture || '/default_avatar.png';
        }

        if(!user) {
            debug('New user');
          var user = {};
          user.provider = provider;
          user.provider_id = profile.id;

          if(profile.emails && profile.emails.length && profile.emails[0].value)
            user.mail = profile.emails[0].value;

          setPicture();
          
          user.name = profile.displayName || '';
          user.username = profile.username || profile.displayName;


          User.add(user).then(function(user_persisted){
            done(null, user_persisted);
          });
        } else { 
            debug('Existing user');
            var picBefore = user.picture;
            setPicture();

            if (user.picture !== picBefore){
                User.update(user.toJSON()).then(function(user_persisted) {  
                    done(null, user);
                });
            } else {
                done(null, user);
            }

        }
      }) ;
    }));

  })(strategy);

}
    return router;
};


/*
CREATE TABLE `User` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(30) NULL,
  `password` VARCHAR(30) NULL,
  `provider` VARCHAR(30) NULL,
  `provider_id` VARCHAR(60) NULL,
  `mail` VARCHAR(60) NULL,
  `picture` VARCHAR(300) NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);


*/
