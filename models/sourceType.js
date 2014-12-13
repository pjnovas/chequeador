var SourceType,
    SourceTypes,
    _              = require('underscore'),
    Persistence    = require('./base');


SourceType = Persistence.Model.extend({

    tableName: 'Source_Type',

    permittedAttributes: [

    ],

    validate: function () {
        return true;
    },

    creating: function () {
        var self = this;
        Persistence.Model.prototype.creating.call(this);
    },

    saving: function () {
        return Persistence.Model.prototype.saving.apply(this, arguments);
    }
}, {

});

SourceTypes = Persistence.Collection.extend({
    model: SourceType
});

module.exports = {
    SourceType: SourceType,
    SourceTypes: SourceTypes
};









