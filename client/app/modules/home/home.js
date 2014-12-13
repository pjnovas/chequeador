'use strict';

angular.module('checkApp.home', ['ngRoute','ui.router','ngResource'])

.config(['$routeProvider', '$stateProvider', function($routeProvider, $stateProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'modules/home/index.html',
    controller: 'HomeController'
  });

 $stateProvider
  .state('list', {
    templateUrl: 'modules/home/partials/grid.html',
    controller: 'checkup-list'
  });


}])
.controller('HomeController', ['$scope','$http', 'Checkup', 'Category', '$state', 'Help', function($scope, $http, Checkup, Category, $state, Help) {

    $scope.phases = [
        {
            id: 'creation',
            title: 'Creación'
        },
        {
            id: 'sources',
            title: 'Fuentes'
        },
        {
            id: 'context',
            title: 'Contexto'
        },
        {
            id: 'qualification',
            title: 'Calificación'
        }
    ];
    $state.go('list');
    Help.setSection('home');
}])

.controller('checkup-list', ['$scope','$http', 'Checkup', 'Category', 'Help', '$state', function($scope, $http, Checkup, Category, Help, $state) {

    $scope.filteredCheckups = $scope.checkups;
    var checkups = Checkup.query(function(data) {
        $scope.filteredCheckups = $scope.checkups = checkups;
    });



    $scope.collaborators = {};
    $scope.own_votes = {};

    var categories = Category.query(function(data) {
        $scope.categories = categories;
        Help.setSection('home');
    });


    var fetchCollaborators = function() {
        $http.get('/api/checkup/collaborators').
        success(function(data, status, headers, config) {
            $scope.collaborators = data.collaborators;
            $scope.own_votes = data.own_votes;
        }).error(function(data, status, headers, config) {

        });
    }; 

    fetchCollaborators();

    $scope.voteUp = function(checkup_id) {
        if($scope.hasVote(checkup_id)) {
            return;
        }
        $http.get('/api/checkup/vote-up/'+checkup_id).
        success(function(data, status, headers, config) {
            fetchCollaborators();
            var checkups = Checkup.query(function(data) {
                $scope.checkups = checkups;
            });
        }).
        error(function(data, status, headers, config) {
        });
    };

    $scope.voteDown = function(checkup_id) {
        if($scope.hasVote(checkup_id)) {
            return;
        }
        $http.get('/api/checkup/vote-down/'+checkup_id).
        success(function(data, status, headers, config) {
            fetchCollaborators();
            var checkups = Checkup.query(function(data) {
                $scope.checkups = checkups;
            });
        }).
        error(function(data, status, headers, config) {
        });
    };

    $scope.getClassByRate = function(rate) {
        if(rate > 0) {
            return 'success';
        }   
        if(rate < 0) {
            return 'danger';
        }   
        return '';
    };

    $scope.getCollaborators = function(checkup_id) {
        return  $scope.collaborators[checkup_id] || [];
    };

    $scope.hasVote = function(checkup_id) {
        var voted = $scope.own_votes[checkup_id],
            up = true;
        if(!voted) return false;
        up = (voted == 1 ? true : false);

        return  {
            class: 'voted-' + (up ? 'up' : 'down'),
            up: up
        }; 
    };

    $scope.categorySelected = null;
    $scope.filterSelected = null;

    $scope.filterBy = function(filter) {
        $scope.filterSelected = filter;
        $scope.categorySelected = null;
        $scope.doFilter();
    };

    $scope.filterByCategory = function(category) {
        $scope.filterSelected = 'category';
        $scope.categorySelected = category;
        $scope.doFilter();
    };

    $scope.doFilter = function() {
        switch($scope.filterSelected) {
            case 'all':
                $scope.filteredCheckups = $scope.checkups;
                break;
            case 'finish':
                $scope.filteredCheckups = _.filter($scope.checkups, function(item) {
                    return item.phase == 'QUALIFICATION';
                });
                break;
            case 'in_progress':
                $scope.filteredCheckups = _.filter($scope.checkups, function(item) {
                    return item.phase != 'QUALIFICATION';
                });
                break;
            case 'category':
                $scope.filteredCheckups = _.filter($scope.checkups, function(item) {
                    return item.quote.category_id == $scope.categorySelected;
                });
                break;
            default:
                $scope.filteredCheckups = $scope.checkups;
                break;
        }

    };

}]);

