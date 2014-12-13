var Action,
    Actions,
    _              = require('underscore'),
    Persistence    = require('./base');


Action = Persistence.Model.extend({

    tableName: 'Action',

    permittedAttributes: [ 'id', 'made_by', 'type', 'on', 'created_by' ],

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

Actions = Persistence.Collection.extend({
    model: Action
});

module.exports = {
    Action: Action,
    Actions: Actions
};

