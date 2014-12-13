angular.module('userModule.controllers',['ngRoute'])

.controller('UserListController', ['$scope', '$routeParams', '$http', 'User', function($scope,$routeParams, $http, User){

    $http.get('http://localhost:3000/api/users', {

    }).
    success(function(data, status, headers, config) {
        $scope.users = data;
    }).
    error(function(data, status, headers, config) {
    });


}])


.controller('UserLoginController', ['$scope', '$routeParams', 'User', function($scope,$routeParams,User){
    $scope.back_url = encodeURIComponent($routeParams.url);
}])

.controller('UserProfileController', ['$scope', '$routeParams', '$stateParams', '$http', 'User', function($scope,$routeParams, $stateParams, $http, User ){

    var user_profile = User.get({
        id: $routeParams.id
    }, function(data) {
        $scope.profile = user_profile;
        callStats(user_profile.id)
    });

    $scope.stats = [];

    var callStats= function(user_id, callback) {
        $http.get('/api/users/'+user_id+'/stats').
        success(function(data, status, headers, config) {
            $scope.stats = data;
            if(callback) {
                callback();
            }
        }).error(function(data, status, headers, config) {

        });
    };

    var stat_description = ['Votos positivos', 'Colaboro en chequeos', 'Inicio chequeos', 'Valoraciones', 'Votos Negativos'];

    $scope.statDescriptionByType = function(type) {
        return stat_description[type - 1];
    };

    $scope.follow = function() {
        //ToDo: Implementar
        
    }

}])


.controller('UserSignupController', ['$scope', '$routeParams', 'User', function($scope,$routeParams,User){


}])

.controller('UserEditController', ['$scope', '$routeParams', 'User', function($scope,$routeParams,User){

    $scope.updateUser=function(){
        $scope.user.$update(function(){
        });
    };

    $scope.loadUser=function(){
        $scope.user = User.get({id:$routeParams.id});
    };

    $scope.loadUser();
}]);
