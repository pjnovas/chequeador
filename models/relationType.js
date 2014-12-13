var RelationType,
    RelationTypes,
    _              = require('underscore'),
    Persistence    = require('./base');


RelationType = Persistence.Model.extend({

    tableName: 'Relation_Type',

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

RelationTypes = Persistence.Collection.extend({
    model: RelationType
});

module.exports = {
    RelationType: RelationType,
    RelationTypes: RelationTypes
};








