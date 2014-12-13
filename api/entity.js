var when = require('when'),
    _ = require('underscore'),
    persistence = require('../models'),
    filteredAttributes = ['created_by', 'created'],
    entities;

entities = {
    browse: function browse(options) {
        return persistence.Entity.browse(options).then(function (result) {
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
        return persistence.Entity.read(args, {
            withRelated: ['entityType']
        }).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'Entity not found'});
        });
    },

    edit: function edit(data) {
        data.id = this.entity;
        return persistence.Entity.edit(data).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'Entity not found'});
        });
    },

    add: function add(data) {
        return persistence.Entity.add(data).then(function(result) {
            if(result) {
                return result;
            }
            return when.reject({errorCode: 404, message: 'Entity not inserted'});
        });
    }


};

module.exports = entities;
module.exports.filteredAttributes = filteredAttributes;





