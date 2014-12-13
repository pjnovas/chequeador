var when = require('when'),
    _ = require('underscore'),
    persistence = require('../models'),
    debug = require('debug')('chequeador'),
    checkups = require('./checkup'),
    filteredAttributes = ['created_by', 'created'],
    rates;

rates = {
    browse: function browse(options) {
        var fetch_options = _.extend(options, {
            withRelated: ['qualified', 'scored']
        });
        return persistence.Rate.browse(fetch_options).then(function (result) {
            var i = 0,
                omitted = {};

            if (result) {
                omitted = result.toJSON();
            }

            for (i = 0; i < omitted.length; i = i + 1) {
                omitted[i] = _.omit(omitted[i], filteredAttributes);
            }

            return omitted;
        });
    },

    read: function read(args) {
        return persistence.Rate.read(args).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'Rate not found'});
        });
    },

    edit: function edit(data) {
        data.id = this.rate;
        return persistence.Rate.edit(data).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'Rate not found'});
        });
    },

    add: function add(data) {
        var user_id = this.user.id,
            checkup_id = data.checkup_id;
        data.user_id = user_id;
        return persistence.Rate.add(data).then(function(rate_result) {
            checkups.updatePhase(checkup_id, 'QUALIFICATION');
            return rate_result;
        });
    },

    ratesByCheckup: function edit(data) {
        var user_id = _.isUndefined(this.user) ? false : this.user.id ,
            checkup_id = data.checkup_id;
        return persistence.Persistence.knex
                    .select()
                    .from('Rates')
                    .where('checkup_id', checkup_id)
                    .then(function(rows) {
                        var map_scores = {},
                            map_qualifications = {},
                            total_votes = 0,
                            max_score = 0,
                            max_qua = 0,
                            selected_score = -1,
                            selected_qua = -1,
                            own_vote = {},
                            map_result = {
                                scores: {},
                                qualifications: {},
                                own_votes: {}
                            };
                        
                        _.each(rows, function(row) {
                            var rate_user_id = row['user_id'],
                                qualification = row['qualification'],
                                score = row['score'],
                                current_votes = map_scores[''+score] || 0,
                                qua_votes = map_qualifications[score] || 0;

                            map_scores[''+score] = current_votes + 1;
                            map_qualifications[qualification] = qua_votes + 1;
                            total_votes = total_votes + 1;
                        
                            if(user_id && user_id == rate_user_id ) {
                                own_vote = {
                                    qualification: qualification,
                                    score: score
                                }; 
                            }

                        });

                        _.each(_.keys(map_scores), function(score_id) {
                            var votes = map_scores[score_id];
                            map_result['scores'][score_id] = {
                                votes: votes,
                                percentage: Math.round( (votes/total_votes * 100) )
                            };
                            if(max_score < votes) {
                                selected_score = score_id;
                                max_score = votes;
                            }
                        });
    
                        _.each(_.keys(map_qualifications), function(qua_id) {
                            var votes = map_qualifications[qua_id];
                            map_result['qualifications'][qua_id] = {
                                votes: votes,
                                percentage: Math.round( (votes/total_votes * 100))
                            };
                            if(max_qua < votes) {
                                selected_qua = qua_id;
                                max_qua = votes;
                            }
                        });
                        map_result['selected_score'] = {
                            id: selected_score,
                            votes: max_score
                        };
                        map_result['selected_qua'] = {
                            id: selected_qua,
                            votes: max_qua
                        };
                        
                        map_result['own_vote'] = own_vote;

                        return map_result;

                    }).catch(function(error) {
                        debug(error);
                        return {};
                    });
    }



};

module.exports = rates;
module.exports.filteredAttributes = filteredAttributes;



