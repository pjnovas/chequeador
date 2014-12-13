var when = require('when'),
    _ = require('underscore'),
    persistence = require('../models'),
    filteredAttributes = ['created_by', 'created'],
    entityRelations;

entityRelations = {
    browse: function browse(options) {
        return persistence.EntityRelation.browse(options).then(function (result) {
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
        return persistence.EntityRelation.read(args).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'EntityRelation not found'});
        });
    },

    edit: function edit(data) {
        data.id = this.entityRelation;
        return persistence.EntityRelation.edit(data).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'EntityRelation not found'});
        });
    },

    add: function add(data) {
        return persistence.EntityRelation.add(data);
    }


};

module.exports = entityRelations;
module.exports.filteredAttributes = filteredAttributes;






