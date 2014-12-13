var when = require('when'),
    _ = require('underscore'),
    persistence = require('../models'),
    _checkups = require('./checkup'),
    action = require('./action'),
    debug = require('debug')('chequeador'),
    filteredAttributes = ['created', 'tags'],
    contexts;

contexts = {
    browse: function browse(options) {
        return persistence.Persistence.knex
            .column('body', 'username', 'picture', 'tags', 'checkup_id')
            .select()
            .from('Context')
            .innerJoin('User', 'Context.created_by', 'User.id')
            .where('checkup_id', options.checkup_id)
            .then(function(rows) {
                return rows;
            }).catch(function(error) {
                return {error: error};
            });

    },

    read: function read(args) {
        return persistence.Context.read(args, {
            withRelated: ['creator']
        }).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'Context not found'});
        });
    },

    edit: function edit(data) {
        data.id = this.context;
        return persistence.Context.edit(data).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'Context not found'});
        });
    },

    add: function add(data) {
        var user_id = this.user.id,
            checkup_id = data.checkup_id;
            if(_checkups) {
               // _checkups.updatePhase(checkup_id, 'CONTEXT');
            }

        data.created_by = user_id;
        return persistence.Context.add(data).then(function(result) {
            action.add({
                made_by: user_id,
                on: result.id,
                type: 2,
                created_by: user_id
            });
        });
    }


};

module.exports = contexts;
module.exports.filteredAttributes = filteredAttributes;




