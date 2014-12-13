angular.module('checkupModule.controllers',['ngRoute', 'ui.router'])

.filter('truncate', function () {
    return function (text, length, end) {
        if (isNaN(length)) {
            length = 10;
        }

        if (end === undefined) {
            end = "...";
        }

        if(_.isUndefined(text) || text == null) {
            return text;
        }
        if (text.length <= length || text.length - end.length <= length) {
            return text;
        }
        else {
            return String(text).substring(0, length-end.length) + end;
        }
    };
})

.controller('CheckupViewController',['$scope', '$state', '$routeParams', '$window', 'Checkup', 'Qualification', 'Help', function($scope, $state, $routeParams, $window, Checkup, Qualification, Help) {

    $scope.phases = [
        {
            id: 'quote',
            code: 'CREACION',
            title: 'Creación',
            text: 'Seleccionar una frase para chequear',
            empty: true,
            active: false,
            icon: '1'
        },
        {
            id: 'source',
            code: 'SOURCES',
            title: 'Fuentes',
            text: 'Consultar fuentes',
            empty: true,
            active: false,
            icon: '2'
        },
        {
            id: 'context',
            code: 'CONTEXT',
            title: 'Contexto',
            text: 'Poner en Contexto',
            empty: true,
            active: false,
            icon: '3'
        },
        {
            id: 'qualification',
            code: 'QUALIFICATION',
            title: 'Calificación',
            text: 'Calificar',
            empty: true,
            active: false,
            icon: '4'
        }
    ];

    $scope.current_phase = $scope.phases[0];
    $scope.maxVoted = -1;

    if($routeParams.id == 'new') {
        $scope.checkup = new Checkup();
    } else {
        $scope.checkup = Checkup.get({
            id: $routeParams.id
        }, function(data) {
            Help.setSection('checkup_base');

            $scope.checkup_id = $scope.checkup.id;
            
            _.each($scope.phases, function(phase) {
                if(phase.code == $scope.checkup['phase']) {
                    $scope.current_phase = phase;
                }
                switch(phase.id) {
                    case 'quote':
                        phase['empty'] = !($scope.checkup['quote'] && $scope.checkup['quote'].text != '') ;
                        break;
                    case 'source':
                        phase['empty'] = _.isEmpty($scope.checkup['sources']);
                        break;
                    case 'context':
                        phase['empty'] = _.isEmpty($scope.checkup['contexts']);
                        break;
                    case 'qualification':
                        phase['empty'] = _.isEmpty($scope.checkup['scores']);
                        break;
                };
                phase['active'] = !phase['empty'];
            });


            $scope.maxVoted = _.max(data.scores, function(item){ return item.votes; });

        });
    }


    $scope.isActive = function(phase) {
        return phase.active ? 'bg-active' : '';
    };
    
    $scope.activePhase = function(phase) {
        $scope.current_phase = _.find($scope.phases, function(phase_item) {
            return phase_item.id == phase;
        });
    };

    $scope.add = function(step) {
        if(_.isUndefined($scope.user_id)) {
            $window.location.href = "/#/users/login?url="+ encodeURIComponent("checkup/"+$scope.checkup.id);
            return;
        }

        switch(step) {
            case 'source':
                if($scope.phases[0].empty) {
                    return;
                }
                break;
            case 'context':
                if($scope.phases[1].empty) {
                    return;
                }
                break;
            case 'qualification':
                if($scope.phases[2].empty) {
                    return;
                }
                break;
            default:
                break;
        }; 

        Help.setSection(step+'_base');
        $state.go(step, {checkup_id: $scope.checkup.id});
    };

    $scope.edit = function(step) {
        if(_.isUndefined($scope.checkup.id) || step == 'quote') {
            return;
        }
        if(_.isUndefined($scope.user_id)) {
            $window.location.href = "/#/users/login?url="+ encodeURIComponent("checkup/"+$scope.checkup.id);
            return;
        }

        Help.setSection(step+'_base');
        $state.go(step, {checkup_id: $scope.checkup.id});
    };

    $scope.isStepDisabled = function(step) {
        return (_.isUndefined($scope.checkup.id) && step != 'quote');
    };

    $scope.itemUrl= function(step) {
        return "modules/checkup/partials/items/"+step+".html";
    };

    $scope.getSourcesByType = function(type) {
        return _.filter($scope.checkup.sources, function(source) {
            return source.type == type;
        });
    };

    $scope.isSourcesTypeEmpty = function(type) {
        return _.isEmpty(_.filter($scope.checkup.sources, function(source) {
                return source.type == type;
        }));
    };

    Qualification.query(function(data) {
        $scope.quality_measures = data;
    });

    $scope.isMaxVoted = function(item) {
        return item.id == $scope.maxVoted.qualification;
    };

    $scope.show_help = function(item_id) {
        Help.setSection(item_id+'_item');
    };

}])

.controller('CheckupQuoteController',['$scope', 'Checkup', 'Quote', 'Category', '$state', 'Help', function($scope,Checkup, Quote, Category, $state, Help){

    $scope.checkup = new Checkup();
    $scope.checkup.quote = new Quote();

    var categories = Category.query(function(data) {
        $scope.categories = categories;
    });

    $scope.addCheckup = function(){
        $scope.checkup.$save(function() {

        });
    };

    $scope.isCheckupPersisted = function(){
        Help.setSection('quote_base');
        return $scope.checkup.id != null;
    };

    $scope.close = function(){
        $state.go('view');
    };

    $scope.quote_rows = 3;

    $scope.max_size = function () {
        $scope.quote_rows = 12;
    };

    $scope.minus_size = function () {
        $scope.quote_rows = 3;
    };


}])

.controller('CheckupSourceController', ['$scope', '$routeParams', '$state', 'Source', 'Checkup', 'Entity', 'Help', function($scope,$routeParams, $state, Source, Checkup, Entity, Help){

    $scope.current_type = 'ORI';


    $scope.sources = {
        'ORI': new Source(),
        'OFI': [],
        'ALT': []
    };

    $scope.source = new Source();
    $scope.checkup_id = $routeParams.id;
    $scope.sourcePersisted = false;

    $scope.checkup = Checkup.get({
        id: $routeParams.id
    }, function() {

        var original_persisted = _.find($scope.checkup.sources, function(source) {
            return source.type == 1;
        });

        if(!_.isUndefined(original_persisted)) {
            $scope.sources['ORI'] = original_persisted;
            $scope.source = $scope.sources['ORI'];
            $scope.source.type = 'ORI';
        } else {
//            $scope.sources['ORI'].entity = $scope.checkup.entity;
            $scope.source = $scope.sources['ORI'];
            $scope.source.type = 'ORI';
        }

        $scope.sources['OFI'] = _.union($scope.sources['OFI'], _.filter($scope.checkup.sources, 
            function(source) {
                return source.type == 2;
            })
        );

        $scope.sources['ALT'] = _.union($scope.sources['ALT'], _.filter($scope.checkup.sources, 
            function(source) {
                return source.type == 3;
            })
        );

        Help.setSection('source_base');

    });

    $scope.getSourcesByType = function(type) {
        return $scope.sources[type];
    };

    $scope.setType = function(type) {
        $scope.current_type = type;
        switch(type) {
            case 'ORI':
                $scope.source = $scope.sources['ORI'];
                Help.setSection('source_original');
                break;
            case 'OFI':
                if(_.size($scope.sources['OFI']) == 0) {
                    var new_source = new Source();
                    new_source.type = 'OFI';
                    $scope.sources['OFI'].push(new_source);
                }
                Help.setSection('source_oficial');
                break;
            case 'ALT':
                if(_.size($scope.sources['ALT']) == 0) {
                    var new_source = new Source();
                    new_source.type = 'ALT';
                    $scope.sources['ALT'].push(new_source);
                }
                Help.setSection('source_alternativa');
                break;
            default:
                break;
        }
    };   

    $scope.addNewSource = function() {
        var fullValidated = true;
        _.each($scope.sources[$scope.current_type], function(model) {
            model.invalid = (model.id || (model.entity && model.entity.name && model.what) ? false : true);
            fullValidated = fullValidated && !model.invalid;
        });
        if(fullValidated) {
            var new_source = new Source();
            new_source.checkup_id = $scope.checkup.id;
            new_source.type = $scope.current_type;
            new_source.entity = {};
            $scope.sources[$scope.current_type].push(new_source);
        }
    };

    $scope.addSource = function(){
        $scope.message_error = null;

        var sources_to_persist = _.union((!_.isUndefined($scope.sources['ORI'].what) &&  !_.isUndefined($scope.sources['ORI'].entity)? [$scope.sources['ORI']] : []), $scope.sources['ALT'], $scope.sources['OFI']);
        if(_.size(sources_to_persist) < 2) {
            $scope.message_error = 'para finalizar el paso 2 tenes que consultar al menos 2 fuentes';
            return; 
        } else {
            var types = _.countBy(sources_to_persist, function(item) {
                return item.type;
            });;
            if(_.size(types) < 2) {
                $scope.message_error = 'para finalizar el paso 2 debes consultar al menos 2 tipos diferentes de fuentes';
                return; 
            }
        }

        _.each(sources_to_persist, function(source) {
            if(_.isUndefined(source.id) && !_.isUndefined(source.entity)) {
                source.checkup_id = $scope.checkup_id;
                source.name = source.entity.name;
                source.description = source.entity.description;
                source.$save();
            }
        });
        $scope.sourcePersisted = true;
    };

    $scope.entityDescriptionPlaceholder = function() {
        return $scope.current_type != 'ALT' ? '¿Qué cargo/rol tiene?' : '¿Por qué es relevante?';
    };


}])


.controller('CheckupContextController',['$scope', '$routeParams', '$state', 'Checkup', 'Context', 'Help', function($scope, $routeParams, $state, Checkup, Context, Help){

    var persisted = false;
    $scope.context = null;

    $scope.contexts = [];

    $scope.checkup = Checkup.get({
        id: $routeParams.id 
    }, function() {
        $scope.contexts = $scope.checkup.full_contexts;        
        if(_.size($scope.contexts) == 0) {
           $scope.context = new Context(); 
        }

    });

    $scope.addContext = function(){
        $scope.context.checkup_id = $scope.checkup.id;
        $scope.context.$save(function(){
            persisted = true;
        });
    }

    $scope.close = function(){
        $state.go('view');
    };

    $scope.isPersisted = function() {
        return persisted;
    };

    $scope.addNewContext = function() {
        $scope.context = new Context();
    };

    $scope.isCreating = function() {
        return $scope.context != null;
    };

    Help.setSection('context_base');
}])

.controller('CheckupQualificationController',['$scope', '$routeParams', '$state', '$http', 'Checkup', 'Rate', 'Qualification', 'Score', 'Help', function($scope, $routeParams, $state, $http, Checkup, Rate, Qualification, Score, Help){

    $scope.hasOwnVote = false;
    $scope.persisted = false;
    $scope.editing = false;

    $scope.qualification = null;

    $scope.votes = {};
    $scope.rate = {};

    $scope.qualify_type = null;
    $scope.selected_score = null;

    $scope.checkup = Checkup.get({
        id: $routeParams.id
    }, function() {
        callVotes($scope.checkup.id, function() {
            $scope.qualification = new Rate(); 
            $scope.editing = !$scope.hasOwnVote;


        });
    });

    var quality_measures = Qualification.query(function(data) {
        $scope.quality_measures = quality_measures;
        $scope.ownRateValues();
    });

    var scores_measures = Score.query(function(data) {
        $scope.scores_measures = scores_measures;
        $scope.ownRateValues();
    });

    $scope.ownRateValues = function() {
        if(_.isEmpty($scope.rate) ) {
            if($scope.hasOwnVote && !_.isEmpty(quality_measures) && !_.isEmpty(scores_measures)) {
                $scope.rate.qualification = _.find(quality_measures, function(item) {
                    return item.id == $scope.votes.own_vote.qualification;
                });
                $scope.rate.score =  _.find(scores_measures, function(item) {
                    return item.id == $scope.votes.own_vote.score;
                });

                $scope.rate.qualification_stats = $scope.votes.qualifications[$scope.votes.own_vote.qualification];
                $scope.rate.score_stats = $scope.votes.scores[$scope.votes.own_vote.score];

            }
        }
        return $scope.rate;
    };

    var callVotes = function(checkup_id, callback) {
        $http.get('/api/rates/checkup/'+checkup_id).
        success(function(data, status, headers, config) {
            $scope.votes = data;
            $scope.hasOwnVote = !_.isEmpty(data.own_vote);
            $scope.ownRateValues();
            callback();
        }).error(function(data, status, headers, config) {

        });
    };

    $scope.addQualification = function(){
        $scope.qualification.checkup_id = $scope.checkup.id;
        $scope.qualification.qualification = $scope.qualify_type;
        $scope.qualification.score = $scope.selected_score;
        $scope.qualification.$save(function(){
            $scope.persisted = true;
            $scope.editing = false;
        });
    }

    $scope.close = function(){
        $state.go('view');
    };

    $scope.addNewQualification = function() {
        $scope.qualification = new Rate();
        $scope.editing = true;
    };

    $scope.scoreByType = function(type) {
        return _.filter($scope.scores_measures, function(score) {
            return score.qualification == type;
        });
    };

    $scope.setType = function(type) {
        $scope.qualify_type = type;
        $scope.selected_score = null;
        $scope.rate.qualification = _.find(quality_measures, function(item) {
            return item.id == type;
        });
        Help.setSection('qualification_after');
    };
    
    $scope.setScore = function(score) {
        $scope.selected_score = score;
        $scope.rate.score =  _.find(scores_measures, function(item) {
            return item.id == score;
        });
    };

    $scope.markQualifySelected = function(qualify_item) {
        return (qualify_item == $scope.qualify_type) ? 'selected' : '';
    };

    $scope.markScoreSelected= function(score_item) {
        return (score_item == $scope.selected_score) ? 'selected' : '';
    };
 
    $scope.percentage = function(score_id) {
        if(_.isUndefined(score_id) ||  _.isUndefined($scope.votes) || _.isUndefined($scope.votes.scores) || _.isUndefined($scope.votes.scores[score_id])) {
            return 0;
        }
        return $scope.votes.scores[score_id].percentage; 
    };

    $scope.votesCount = function(score_id) {
        if(_.isUndefined(score_id) ||  _.isUndefined($scope.votes) || _.isUndefined($scope.votes.scores) || _.isUndefined($scope.votes.scores[score_id])) {
            return 0;
        }
        return $scope.votes.scores[score_id].votes; 
    };

}]);


