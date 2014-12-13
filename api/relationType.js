var when = require('when'),
    _ = require('underscore'),
    persistence = require('../models'),
    filteredAttributes = ['created_by', 'created'],
    relationTypes;

relationTypes = {
    browse: function browse(options) {
        return persistence.RelationType.browse(options).then(function (result) {
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
        return persistence.RelationType.read(args).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'RelationType not found'});
        });
    },

    edit: function edit(data) {
        data.id = this.relationType;
        return persistence.RelationType.edit(data).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'RelationType not found'});
        });
    },

    add: function add(data) {
        return persistence.RelationType.add(data);
    }


};

module.exports = relationTypes;
module.exports.filteredAttributes = filteredAttributes;




