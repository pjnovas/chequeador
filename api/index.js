var _ = require('underscore'),
    debug = require('debug')('chequeador'),
    users = require('./users'),
    action = require('./action'),
    actionType = require('./actionType'),
    actionType = require('./actionType'),
    category = require('./category'),
    checkup = require('./checkup'),
    checkupUser = require('./checkupUser'),
    comment = require('./comment'),
    context = require('./context'),
    entity = require('./entity'),
    entityRelation = require('./entityRelation'),
    entityType = require('./entityType'),
    input = require('./input'),
    qualification = require('./qualification'),
    quote = require('./quote'),
    rate = require('./rate'),
    relationType = require('./relationType'),
    roleType = require('./roleType'),
    score = require('./score'),
    source = require('./source'),
    sourceType = require('./sourceType'),
    requestHandler;


/*
requestHandler = function (apiMethod) {
    return function (req, res) {
        debug('options');
        debug(req.user);
        var options = _.extend(req.body, req.files, req.query, req.params),
            apiContext = {
                user: req.user
            };
        return apiMethod.call(apiContext, options).then(function (result) {
            res.json(result || {});
        }, function (error) {
            debug(error);
            var errorCode = error.errorCode || 500,
                errorMsg = {error: _.isString(error) ? error : (_.isObject(error) ? error.message : 'Unknown API Error')};
            res.status(errorCode).json(errorMsg)
        });
    };
};
*/

module.exports = {
    users: users,
    actions: action,
    actionTypes: actionType,
    categories: category,
    checkups: checkup,
    checkupUsers: checkupUser,
    comments: comment,
    contexts: context,
    entities: entity,
    entityRelations: entityRelation,
    entityTypes: entityType,
    inputs: input,
    qualifications: qualification,
    quotes: quote,
    rates: rate,
    relationTypes: relationType,
    roleTypes: roleType,
    scores: score,
    sources: source,
    sourceTypes: sourceType/*,
    requestHandler: requestHandler
    */
};
