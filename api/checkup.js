var when = require('when'),
    debug = require('debug')('chequeador'),
    _ = require('underscore'),
    persistence = require('../models'),
    quotes = require('./quote'),
    contexts = require('./context'),
    action = require('./action'),
    entities = require('./entity'),
    filteredAttributes = ['created_by', 'created'],
    checkups;

checkups = {
    browse: function browse(options) {
        debug('browse: ');

        var fetch_options = _.extend(options, {
            withRelated: ['quote', 'entity']
        });
        return persistence.Checkup.browse(fetch_options).then(function (result) {
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

    _read: function read(args) {
        var checkup_id = args.id;
        debug('Checkup id: '+checkup_id);
        return persistence.Checkup.read(args, {
            withRelated: ['quote', 'sources', 'contexts', 'entity']
        }).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);

                return contexts.browse({
                    checkup_id: result.id
                }).then(function(contexts_result) {

                    omitted.full_contexts = contexts_result;

                    return persistence.Persistence.knex
                    .select()
                    .column('Rates.qualification', 'Qualification.description')
                    .count('score as votes')
                    .from('Rates')
                    .innerJoin('Qualification', 'Rates.qualification', 'Qualification.id')
                    .innerJoin('Score', 'Rates.score', 'Score.id')
                    .where('checkup_id', checkup_id)
                    .groupBy('Rates.qualification')
                    .groupBy('Qualification.description')
                    .then(function(rows) {

                        debug(rows);
                        omitted.scores = rows;

                        return omitted;

                    });


                });

            }
            return when.reject({errorCode: 404, message: 'Checkup not found'});
        });
    },

    read: function read(args) {
        var checkup_id = args.id,
            omitted = {};
        return persistence.Checkup.read(args, {
            withRelated: ['quote', 'contexts', 'entity']
        }).then(function (result) {
            if (result) {
                omitted = _.omit(result.toJSON(), filteredAttributes);

                return contexts.browse({
                    checkup_id: result.id
                }).then(function(contexts_result) {

                    omitted.full_contexts = contexts_result;

                    return persistence.Persistence.knex
                    .select()
                    .column('Rates.qualification', 'Qualification.description')
                    .count('score as votes')
                    .from('Rates')
                    .innerJoin('Qualification', 'Rates.qualification', 'Qualification.id')
                    .innerJoin('Score', 'Rates.score', 'Score.id')
                    .where('checkup_id', checkup_id)
                    .groupBy('Rates.qualification')
                    .groupBy('Qualification.description')
                    .then(function(rows) {

                        omitted.scores = rows;




                          return persistence.Persistence.knex
                                    .select()
                                    .columns('Source.id', 'Source.checkup_id', 'Source.source_entity_id', 'Source.type', 'Source.what', 'Source.checked', 'Source.observation', 'Source.created_by', 'Entity.id as entity_id', 'Entity.name as entity_name', 'Entity.description as entity_description', 'Entity.type as entity_type')
                                    .from('Source')
                                    .innerJoin('Entity', 'Source.source_entity_id', 'Entity.id')
                                    .where('checkup_id', checkup_id)
                                    .then(function(sources_result) {
                                        var sources = [];
                                        _.each(sources_result, function(source) {
                                            sources.push({
                                                id: source.id,
                                                type: source.type,
                                                checkup_id: source.checkup_id,
                                                what: source.what,
                                                checked: source.checked,
                                                observation: source.observation,
                                                created_by: source.created_by,
                                                entity: {
                                                    id: source.entity_id,
                                                    name: source.entity_name,
                                                    description: source.entity_description,
                                                    type: source.entity_type
                                                }
                                            });
                                        });
                                        omitted.sources = sources;
                                        return omitted;

                                    });

                    });


                });

            }
            return when.reject({errorCode: 404, message: 'Checkup not found'});
        });
    },



    updatePhase: function updatePhase(checkup_id, phase) {

        return persistence.Checkup.read({id: checkup_id}).then(function (result) {
            if (result) {
                return result.save({phase: phase});
            }
            return when.reject({errorCode: 404, message: 'Checkup not found'});
        });
    },

    voteUp: function voteUp(args) {
        var user_id = this.user.id;

        return persistence.Checkup.read(args).then(function (result) {
            if (result) {
                var new_rate = result.get('rate') + 1;
                result.save({rate: new_rate}).then(function(model) {
                    action.add({
                        made_by: user_id,
                        on: result.id,
                        type: 1,
                        created_by: user_id
                    });
                });

                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'Checkup not found'});
        });
    },

    voteDown: function voteDown(args) {
        var user_id = this.user.id;

        return persistence.Checkup.read(args).then(function (result) {
            if (result) {
                var new_rate = result.get('rate') - 1;
                result.save({rate: new_rate}).then(function(model) {
                    action.add({
                        made_by: user_id,
                        on: result.id,
                        type: 5,
                        created_by: user_id
                    });
                });

                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'Checkup not found'});
        });
    },

    checkups_collaborators: function edit(data) {
        var user_id = _.isUndefined(this.user) ? false : this.user.id ;
        return persistence.Persistence.knex
            .column('on', 'made_by', 'username', 'picture', 'type')
            .select()
            .from('Action')
            .innerJoin('User', 'Action.made_by', 'User.id')
            .groupBy('on', 'made_by', 'username', 'picture', 'type')
            .then(function(rows) {
                var map = {},
                    votes = {},
                    map_keys = {};

                _.each(rows, function(row) {
                    var on = row['on'],
                        made_by = row['made_by'],
                        type = row['type'],
                        uniq_key = on+'-'+made_by;

                    if(!_.contains([1,5], type)) {
                        if(_.isUndefined(map[on])) {
                            map[on] = [];
                        }
                        if(_.isUndefined(map_keys[uniq_key])) {
                            map[on].push(row);
                            map_keys[uniq_key] = true;
                        }
                    } else {
                        debug('Usuario vota? '+row['made_by']+' - '+row['type']);
                        if(user_id && made_by == user_id) {
                            votes[on] = type;
                        }
                    }
                });
                return {
                    collaborators: map,
                    own_votes: votes
                };
            }).catch(function(error) {
                debug(error);
                return {};
            });
    },

    edit: function edit(data) {
        data.id = this.checkup;
        return persistence.Checkup.edit(data).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'Checkup not found'});
        });
    },

    add: function add(data) {
        var checkup_to_persist = {
            status: 'OPEN',
            phase: 'CREATION',
            created_by: this.user.id
        },
        user_id = this.user.id,
        quote = data.quote,
        new_quote = {
            text: quote.text,
            //entity: quote.author.id, //ENTITY
            _where: quote.where,
            when:   quote.when,
            category_id: quote.category.id,
            rate: quote.rate
        },
        new_entity = {
            name: quote.author,
            type: 1 //Hasta tanto administremos entidades
        };

        return persistence.Entity.add(new_entity).then(function (result_entity) {
            debug('insertada entidad');
            checkup_to_persist.entity_id = result_entity.id;
            new_quote.entity_id = result_entity.id;
            return persistence.Checkup.add(checkup_to_persist).then(function (result) {
                if (result) {
                    new_quote.checkup_id = result.id;
                    quotes.add(new_quote).then(function() {
                        debug('insertada quote');
                        action.add({
                            made_by: user_id,
                            on: result.id,
                            type: 3,
                            created_by: user_id
                        });
                    });
                    return result;
                }
                return when.reject({errorCode: 404, message: 'Checkup not inserted'});
            });
        });
    }


};

module.exports = checkups;
module.exports.filteredAttributes = filteredAttributes;


