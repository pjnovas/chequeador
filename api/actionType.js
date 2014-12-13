var when = require('when'),
    _ = require('underscore'),
    persistence = require('../models'),
    filteredAttributes = ['created_by', 'created'],
    actionTypes;

actionTypes = {
    browse: function browse(options) {
        return persistence.ActionType.browse(options).then(function (result) {
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
        return persistence.ActionType.read(args).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'ActionType not found'});
        });
    },

    edit: function edit(data) {
        data.id = this.actionType;
        return persistence.ActionType.edit(data).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'ActionType not found'});
        });
    },

    add: function add(data) {
        return persistence.ActionType.add(data);
    }


};

module.exports = actionTypes;
module.exports.filteredAttributes = filteredAttributes;


