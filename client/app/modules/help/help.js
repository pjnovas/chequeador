'use strict';

angular.module('checkApp.help', [])

.config([function() {

}])
.controller('HelpController', ['$scope','$http', '$rootScope', function($scope, $http, $rootScope) {
    $scope.testClick = function() {

    };

    var base_dir = 'modules/help/partials/'; 

    $scope.currentText = base_dir+'home.html';
    $scope.previousSection = null;

    $scope.setText = function(section) {
        var section_url = 'home';
        if(!_.isUndefined(section)) {
            section_url = section;
        }
        $scope.currentText = base_dir+section_url+'.html';
    };

    $rootScope.$watch('help_section', function(newValue, oldValue){
        $scope.setText(newValue);
        $scope.previousSection = oldValue;
    });


}]);

