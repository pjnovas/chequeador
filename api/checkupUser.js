var when = require('when'),
    _ = require('underscore'),
    persistence = require('../models'),
    filteredAttributes = ['created_by', 'created'],
    checkupUsers;

checkupUsers = {
    browse: function browse(options) {
        return persistence.CheckupUser.browse(options).then(function (result) {
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
        return persistence.CheckupUser.read(args).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'CheckupUser not found'});
        });
    },

    edit: function edit(data) {
        data.id = this.checkupUser;
        return persistence.CheckupUser.edit(data).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'CheckupUser not found'});
        });
    },

    add: function add(data) {
        return persistence.CheckupUser.add(data);
    }


};

module.exports = checkupUsers;
module.exports.filteredAttributes = filteredAttributes;



