var Category,
    Categories,
    _              = require('underscore'),
    Persistence    = require('./base');


Category = Persistence.Model.extend({

    tableName: 'Category',

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

Categories = Persistence.Collection.extend({
    model: Category
});

module.exports = {
    Category: Category,
    Categories: Categories
};



