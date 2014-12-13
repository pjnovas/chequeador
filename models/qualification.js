var Qualification,
    Qualifications,
    _              = require('underscore'),
    Persistence    = require('./base');


Qualification = Persistence.Model.extend({

    tableName: 'Qualification',

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

Qualifications = Persistence.Collection.extend({
    model: Qualification
});

module.exports = {
    Qualification: Qualification,
    Qualifications: Qualifications
};








