var when = require('when'),
    _ = require('underscore'),
    persistence = require('../models'),
    action = require('./action'),
    filteredAttributes = ['created_by', 'created'],
    qualifications;

qualifications = {
    browse: function browse(options) {
        return persistence.Qualification.browse(options).then(function (result) {
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
        return persistence.Qualification.read(args).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'Qualification not found'});
        });
    },

    edit: function edit(data) {
        data.id = this.qualification;
        return persistence.Qualification.edit(data).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'Qualification not found'});
        });
    },

    add: function add(data) {
        return persistence.Qualification.add(data);
    }


};

module.exports = qualifications;
module.exports.filteredAttributes = filteredAttributes;

