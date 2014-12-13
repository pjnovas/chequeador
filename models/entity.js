var Entity,
    Entities,
    Checkup = require('./checkup').Checkup,
    Quote = require('./quote').Quote,
    EntityType = require('./entityType').EntityType,
    _              = require('underscore'),
    Persistence    = require('./base');


Entity = Persistence.Model.extend({

    tableName: 'Entity',


    permittedAttributes: ['id', 'name', 'description', 'type', 'created_by'],

    validate: function () {
        return true;
    },

    creating: function () {
        var self = this;
        Persistence.Model.prototype.creating.call(this);
    },

    entityType: function() {
        return this.belongsTo(EntityType, 'type');
    },

    checkup: function() {
        this.hasMany(Checkup, 'entity_id');
    },

    saving: function () {
        return Persistence.Model.prototype.saving.apply(this, arguments);
    }

}, {

});

Entities = Persistence.Collection.extend({
    model: Entity
});

module.exports = {
    Entity: Entity,
    Entities: Entities
};







