var EntityType,
    EntityTypes,
    _              = require('underscore'),
    Persistence    = require('./base');


EntityType = Persistence.Model.extend({

    tableName: 'Entity_Type',

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

EntityTypes = Persistence.Collection.extend({
    model: EntityType
});

module.exports = {
    EntityType: EntityType,
    EntityTypes: EntityTypes
};








