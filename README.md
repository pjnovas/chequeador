chequeador
==========

**chequeador** is the  crowdchecking platform of [Chequeado.com](http://chequeado.com) which aims to encourage citizens to collaboratively build checks. It is a work space with a strong educational content that promotes learning method of the [Chequeado](http://chequeado.com),  building a community checkers.

**chequeador** es la plataforma de crowdchecking de [Chequeado.com](http://chequeado.com) cuyo objetivo es favorecer que los ciudadanos construyan chequeos de forma colaborativa. Es un espacio con una fuerte impronta educativa que promueve el aprendizaje del método de [Chequeado](http://chequeado.com) formando una comunidad de chequeadores.

About Platform
=====
**chequeado** backend is built on node.js. The client is an angular.js app. 


Install
===========

1. Checkout repsitory [chequeador](https://github.com/Chequeadocom/chequeador)
1. run `npm install`  to install the node dependencies. 
1. run `bower install` in `<root>\client\app` to install client dependencies.
1. import sql schema: `mysql <<databasename>> < sql/model.sql`
1. config application  (see **Config** section)
1. To start **chequeador**  run `./bin/www`. In order to display debug messages in console run: `DEBUG=chequeador ./bin/www`.
1. Visit `http://localhost:3000/` in your web browser

Config
======

In your `config/config.json`:

* `db`:
    + `host`
    + `port`
    + `user`
    + `password`
    + `pool`: # connections
* `session`: Secret session key

In your `config/keys.json`you should set the social tokens for apps (twitter, facebook, etc)


Structure
=========

Client (angular.js)
===============
Location:  **/client/app**

Modules:
 - checkup:  implements checkup methodology steps
 - home: the main grid
 - site: page wrapper (header, footer, etc)
 - user: loguin/profile
 - help: context help

Services: 
REST client`/client/app/js/services.js`

Server (node.js)
=====

Main Technologies:
 - [Express 4](http://expressjs.com/)
 - [Bookshelf](bookshelfjs.org) - [Knex](knexjs.org)
 - [Passport](passportjs.org)
 - [When](https://github.com/cujojs/when)

Directory structure:  
├── server.js  - Main flow  
├── routes - Flow distribution  
├── api - Logic controllers  
├── models - Persistence maps  
├── sql - Sql database scripts  
├── auth.js - Authentication/Authorization logic  
├── config - App parameters  
└── views - Html template for the single page app  

