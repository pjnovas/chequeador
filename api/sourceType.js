var when = require('when'),
    _ = require('underscore'),
    persistence = require('../models'),
    filteredAttributes = ['created_by', 'created'],
    sourceTypes;

sourceTypes = {
    browse: function browse(options) {
        return persistence.SourceType.browse(options).then(function (result) {
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
        return persistence.SourceType.read(args).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'SourceType not found'});
        });
    },

    edit: function edit(data) {
        data.id = this.sourceType;
        return persistence.SourceType.edit(data).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'SourceType not found'});
        });
    },

    add: function add(data) {
        return persistence.SourceType.add(data);
    }


};

module.exports = sourceTypes;
module.exports.filteredAttributes = filteredAttributes;



