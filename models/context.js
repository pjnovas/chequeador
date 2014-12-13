var Context,
    Contexts,
    _              = require('underscore'),
    Persistence    = require('./base');


Context = Persistence.Model.extend({

    tableName: 'Context',

    permittedAttributes: ['id', 'checkup_id', 'body', 'tags', 'created_by'],

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

Contexts = Persistence.Collection.extend({
    model: Context
});

module.exports = {
    Context: Context,
    Contexts: Contexts
};






