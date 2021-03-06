var when = require('when'),
    debug = require('debug')('chequeador'),
    _ = require('underscore'),
    persistence = require('../models'),
    filteredAttributes = ['created_by', 'created'],
    quotes;

quotes = {
    browse: function browse(options) {
        return persistence.Quote.browse(options).then(function (result) {
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
        return persistence.Quote.read(args).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'Quote not found'});
        });
    },

    edit: function edit(data) {
        data.id = this.quote;
        return persistence.Quote.edit(data).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'Quote not found'});
        });
    },

    add: function add(data) {
        return persistence.Quote.add(data);
    }


};

module.exports = quotes;
module.exports.filteredAttributes = filteredAttributes;


