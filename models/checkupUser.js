var CheckupUser,
    CheckupUsers,
    _              = require('underscore'),
    Persistence    = require('./base');


CheckupUser = Persistence.Model.extend({

    tableName: 'Checkup_User',

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

CheckupUsers = Persistence.Collection.extend({
    model: CheckupUser
});

module.exports = {
    CheckupUser: CheckupUser,
    CheckupUsers: CheckupUsers
};





