'use strict';

angular.module('checkApp', [
    'ngRoute',
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'checkApp.services',
    'checkApp.home',
    'checkApp.help',
    'checkApp.userModule',
    'checkApp.checkupModule'

]).
config(['$routeProvider', function($routeProvider) {
  
    $routeProvider.otherwise({redirectTo: '/home'});
}])
.run(function($rootScope, $window) {

    $rootScope.user_id = $window.user_id;
});
