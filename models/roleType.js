var RoleType,
    RoleTypes,
    _              = require('underscore'),
    Persistence    = require('./base');


RoleType = Persistence.Model.extend({

    tableName: 'Role_Type',

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

RoleTypes = Persistence.Collection.extend({
    model: RoleType
});

module.exports = {
    RoleType: RoleType,
    RoleTypes: RoleTypes
};








