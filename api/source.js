var when = require('when'),
    debug = require('debug')('chequeador'),
    _ = require('underscore'),
    entities = require('./entity'),
    checkups = require('./checkup'),
    persistence = require('../models'),
    action = require('./action'),
    filteredAttributes = [],
    sourceTypes = ['ORI', 'OFI', 'ALT'],
    sources;

sources = {
    browse: function browse(options) {
        var fetch_options = _.extend(options, {
            withRelated: ['sourceType', 'entity']
        });
        return persistence.Source.browse(fetch_options).then(function (result) {
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
        return persistence.Source.read(args, {
            withRelated: ['sourceType']
        }).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'Source not found'});
        });
    },

    edit: function edit(data) {
        data.id = this.source;
        return persistence.Source.edit(data).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'Source not found'});
        });
    },

    add: function add(data) {
        var entity = data.entity,
            user_id = this.user.id,
            checkup_id = data.checkup_id,
            new_entity = {
                name: entity.name,
                description: entity.description,
                type: entity.type || 1
            },
            source_to_persist = _.extend(data, {
                created_by: user_id,
                type: _.indexOf(sourceTypes, data.type || 0) + 1
            });

        data.user_id = user_id;
        return persistence.Entity.add(new_entity).then(function (result_entity) {
            source_to_persist.source_entity_id = result_entity.id;
            return persistence.Source.add(source_to_persist).then(function(source_persisted){
                if(source_persisted) {
                     action.add({
                        made_by: user_id,
                        on: source_persisted.id,
                        type: 2,
                        created_by: user_id
                    });
                    checkups.updatePhase(checkup_id, 'SOURCES');
                    source_persisted.set({entity: entity});
                    return source_persisted;
                }
                return when.reject({errorCode: 404, message: 'Checkup not inserted'});
            });
        });


    }


};

module.exports = sources;
module.exports.filteredAttributes = filteredAttributes;


