var EntityRelation,
    EntityRelations,
    _              = require('underscore'),
    Persistence    = require('./base');


EntityRelation = Persistence.Model.extend({

    tableName: 'Entity_Relation',

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

EntityRelations = Persistence.Collection.extend({
    model: EntityRelation
});

module.exports = {
    EntityRelation: EntityRelation,
    EntityRelations: EntityRelations
};







