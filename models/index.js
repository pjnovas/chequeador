var _ = require('underscore');

module.exports = {
    Persistence: require('./base'),
    User: require('./user').User,
    Checkup: require('./checkup').Checkup,
    Quote: require('./quote').Quote,
    Source: require('./source').Source,
    Context: require('./context').Context,
    Rate: require('./rate').Rate,
    Entity: require('./entity').Entity,
    Input: require('./input').Input,
    Comment: require('./comment').Comment,
    Action: require('./action').Action,
    CheckupUser: require('./checkupUser').CheckupUser,
    EntityRelation: require('./entityRelation').EntityRelation,
    SourceType: require('./sourceType').SourceType,
    EntityType: require('./entityType').EntityType,
    Qualification: require('./qualification').Qualification,
    Score: require('./score').Score,
    RelationType: require('./relationType').RelationType,
    ActionType: require('./actionType').ActionType,
    RoleType: require('./roleType').RoleType,
    Category: require('./category').Category,

    init: function () {
        return migrations.init();
    }
};

