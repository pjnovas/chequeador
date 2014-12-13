var Checkup,
    Checkups,
    _ = require('underscore'),
    Quote = require('./quote').Quote,
    Rate = require('./rate').Rate,
    Entity= require('./entity').Entity,
    Source = require('./source').Source,
    Context = require('./context').Context,
    Persistence = require('./base');


Checkup = Persistence.Model.extend({

    tableName: 'Checkup',

    permittedAttributes: ['id', 'status', 'phase', 'fork_from', 'created_by', 'rate', 'entity_id' ],

    quote: function() {
        return this.hasOne(Quote, 'checkup_id');
    },

    entity: function() {
        return this.belongsTo(Entity, 'entity_id');
    },

    sources: function() {
        return this.hasMany(Source, 'checkup_id');
    },

    contexts: function() {
        return this.hasMany(Context, 'checkup_id');
    },

    qualifications: function() {
        return this.hasMany(Rate, 'checkup_id');
    },

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

Checkups = Persistence.Collection.extend({
    model: Checkup
});

module.exports = {
    Checkup: Checkup,
    Checkups: Checkups
};




