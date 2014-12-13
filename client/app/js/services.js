angular.module('checkApp.services',['ngResource', 'checkApp.help']).
    factory('User',['$resource', function($resource){
        return $resource('http://chequeador.collab-dev.com/api/users/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('Checkup',['$resource', function($resource){
        return $resource('http://chequeador.collab-dev.com/api/checkups/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('Quote',['$resource', function($resource){
        return $resource('http://chequeador.collab-dev.com/api/quotes/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('Source',['$resource', function($resource){
        return $resource('http://chequeador.collab-dev.com/api/sources/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('Context',['$resource', function($resource){
        return $resource('http://chequeador.collab-dev.com/api/contexts/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('Rate',['$resource', function($resource){
        return $resource('http://chequeador.collab-dev.com/api/rates/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('Score',['$resource', function($resource){
        return $resource('http://chequeador.collab-dev.com/api/scores/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('Qualification',['$resource', function($resource){
        return $resource('http://chequeador.collab-dev.com/api/qualifications/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('Entity',['$resource', function($resource){
        return $resource('http://chequeador.collab-dev.com/api/entities/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('Category',['$resource', function($resource){
        return $resource('http://chequeador.collab-dev.com/api/categories/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('SourceType',['$resource', function($resource){
        return $resource('http://chequeador.collab-dev.com/api/source-types/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('EntityType',['$resource', function($resource){
        return $resource('http://chequeador.collab-dev.com/api/entity-types/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('Help',['$rootScope', function($rootScope) {
        return {
            setSection: function(section) {
                $rootScope.help_section = section;
            }
        };
    }]);
