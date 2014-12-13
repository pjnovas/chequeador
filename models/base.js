var Persistence,
    moment    = require('moment'),
    _         = require('underscore'),
    config = require('../config/config.json')
    knex = require('knex')({
        client: 'mysql',
        connection: config.db,
        pool: {
            min: 0,
            max: config.db.pool
        }
    }),
    Bookshelf = require('bookshelf')(knex);

Persistence = Bookshelf.checkup = Bookshelf;

Persistence.Model = Persistence.Model.extend({

        hasTimestamps: true,

        permittedAttributes: [],


        defaults: function () {
            return {
            };
        },

        initialize: function () {
            this.on('creating', this.creating, this);
            this.on('saving', this.saving, this);
            this.on('saving', this.validate, this);
        },

        creating: function () {
            if (!this.get('created_by')) {
                this.set('created_by', 1);
            }
        },

        saving: function () {
            this.attributes = this.pick(this.permittedAttributes);
        },

        fixDates: function (attrs) {
            _.each(attrs, function (value, key) {
                if (key.substr(-3) === '_at' && value !== null) {
                    attrs[key] = moment(attrs[key]).toDate();
                }
            });

            return attrs;
        },

        fixBools: function (attrs) {
            _.each(attrs, function (value, key) {
                if (typeof value === "boolean") {
                    attrs[key] = value ? 1 : 0;
                }
            });

            return attrs;
        },

        format: function (attrs) {
            return this.fixBools(this.fixDates(attrs));
        },

        toJSON: function (options) {
            var attrs = this.fixBools(this.fixDates(_.extend({}, this.attributes))),
                relations = this.relations;

            if (options && options.shallow) {
                return attrs;
            }

            _.each(relations, function (relation, key) {
                if (key.substring(0, 7) !== '_pivot_') {
                    attrs[key] = relation.toJSON ? relation.toJSON() : relation;
                }
            });

            return attrs;
        }

}, {

    findAll:  function (options) {
        options = options || {};
        return Persistence.Collection.forge([], {model: this}).fetch(options);
    },

    browse: function () {
        return this.findAll.apply(this, arguments );
    },

    findOne: function (args, options) {
        options = options || {};
            
        return this.forge(args).fetch(options);
    },

    read: function () {
        return this.findOne.apply(this, arguments, {withRelated: this.populateWithRelations});
    },

    edit: function (editedObj, options) {
        options = options || {};
        return this.forge({id: editedObj.id}).fetch(options).then(function (foundObj) {
            return foundObj.save(editedObj, options);
        });
    },

    update: function () {
        return this.edit.apply(this, arguments);
    },

    add: function (newObj, options) {
        options = options || {};
        var instance = this.forge(newObj);
        if (options.importing) {
            instance.hasTimestamps = false;
        }
        return instance.save(null, options);
    },

    create: function () {
        return this.add.apply(this, arguments);
    },

    destroy: function (_identifier, options) {
        options = options || {};
        return this.forge({id: _identifier}).destroy(options);
    },

    'delete': function () {
        return this.destroy.apply(this, arguments);
    }

});

module.exports = Persistence;
