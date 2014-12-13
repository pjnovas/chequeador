var Score,
    Scores,
    _              = require('underscore'),
    Persistence    = require('./base');


Score = Persistence.Model.extend({

    tableName: 'Score',

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

Scores = Persistence.Collection.extend({
    model: Score
});

module.exports = {
    Score: Score,
    Scores: Scores
};








