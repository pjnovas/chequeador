var Source,
    Sources,
    _           = require('underscore'),
    SourceType  = require('./sourceType').SourceType,
    Entity      = require('./entity').Entity,
    Persistence = require('./base');

Source = Persistence.Model.extend({

    tableName: 'Source',

    permittedAttributes: [ 'id', 'checkup_id', 'source_entity_id', 'type', 'what', 'checked', 'observation', 'created_by' ],

    validate: function () {
        return true;
    },

    creating: function () {
        var self = this;
        Persistence.Model.prototype.creating.call(this);
    },

    saving: function () {
        return Persistence.Model.prototype.saving.apply(this, arguments);
    },

    entity: function() {
        return this.belongsTo(Entity, 'source_entity_id');
    },

    sourceType: function() {
        return this.belongsTo(SourceType, 'type');
    }


}, {

});

Sources = Persistence.Collection.extend({
    model: Source
});

module.exports = {
    Source: Source,
    Sources: Sources
};

