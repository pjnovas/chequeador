var ActionType,
    ActionTypes,
    _              = require('underscore'),
    Persistence    = require('./base');


ActionType = Persistence.Model.extend({

    tableName: 'Action_Type',

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

ActionTypes = Persistence.Collection.extend({
    model: ActionType
});

module.exports = {
    ActionType: ActionType,
    ActionTypes: ActionTypes
};


