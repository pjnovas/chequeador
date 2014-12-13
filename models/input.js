var Input,
    Inputs,
    _              = require('underscore'),
    Persistence    = require('./base');


Input = Persistence.Model.extend({

    tableName: 'Input',

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

Inputs = Persistence.Collection.extend({
    model: Input
});

module.exports = {
    Input: Input,
    Inputs: Inputs
};







