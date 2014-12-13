var when = require('when'),
    _ = require('underscore'),
    persistence = require('../models'),
    filteredAttributes = ['created_by', 'created'],
    entityTypes;

entityTypes = {
    browse: function browse(options) {
        return persistence.EntityType.browse(options).then(function (result) {
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
        return persistence.EntityType.read(args).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'EntityType not found'});
        });
    },

    edit: function edit(data) {
        data.id = this.entityType;
        return persistence.EntityType.edit(data).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'EntityType not found'});
        });
    },

    add: function add(data) {
        return persistence.EntityType.add(data);
    }


};

module.exports = entityTypes;
module.exports.filteredAttributes = filteredAttributes;







