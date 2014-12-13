var Rate,
    Rates,
    _ = require('underscore'),
    Qualification = require('./qualification').Qualification,
    Score = require('./score').Score,
    Persistence = require('./base');


Rate = Persistence.Model.extend({

    tableName: 'Rates',

    permittedAttributes: ['id', 'checkup_id', 'user_id', 'qualification', 'score', 'created_by' ],

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

    qualified: function() {
        return this.belongsTo(Qualification, 'qualification');
    },

    scored: function() {
        return this.belongsTo(Score, 'score');
    }

}, {

});

Rates = Persistence.Collection.extend({
    model: Rate
});

module.exports = {
    Rate: Rate,
    Rates: Rates
};








