var when = require('when'),
    _ = require('underscore'),
    persistence = require('../models'),
    filteredAttributes = ['created_by', 'created'],
    comments;

comments = {
    browse: function browse(options) {
        return persistence.Comment.browse(options).then(function (result) {
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
        return persistence.Comment.read(args).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'Comment not found'});
        });
    },

    edit: function edit(data) {
        data.id = this.comment;
        return persistence.Comment.edit(data).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'Comment not found'});
        });
    },

    add: function add(data) {
        return persistence.Comment.add(data);
    }


};

module.exports = comments;
module.exports.filteredAttributes = filteredAttributes;



