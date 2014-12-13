'use strict';

angular.module('checkApp.userModule', ['ngRoute','ngResource', 'ui.router', 'userModule.controllers'])

.config(['$routeProvider', '$stateProvider', function($routeProvider, $stateProvider) {
  $routeProvider.when('/users/login', {
        templateUrl:'modules/user/partials/login.html',
        controller:'UserLoginController'
    })
    .when('/users/signup', {
        templateUrl:'modules/user/partials/signup.html',
        controller:'UserSignupController'
    })
    .when('/users/profile/:id', {
        templateUrl: 'modules/user/index.html',
        controller:'UserController'
    });

    $stateProvider
    .state('profile', {
        templateUrl: 'modules/user/partials/profile.html',
        controller: 'UserProfileController'/*,
        params: ['user_id']*/

    });

}])

.controller('UserController',['$scope', '$routeParams', '$state', 'User', function($scope,$routeParams,$state,User){
    $state.go('profile');

}]);

