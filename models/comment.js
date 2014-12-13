var Comment,
    Comments,
    _              = require('underscore'),
    Persistence    = require('./base');


Comment = Persistence.Model.extend({

    tableName: 'Comment',

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

Comments = Persistence.Collection.extend({
    model: Comment
});

module.exports = {
    Comment: Comment,
    Comments: Comments
};





