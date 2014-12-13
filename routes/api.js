var api = require('../api'),
    express = require('express'),
    _ = require('underscore'),
    debug = require('debug')('chequeador'),
    router = express.Router();

var requestHandler = function (apiMethod) {
    return function (req, res) {
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

var authAPI = function(req, res, next) {
    if ((!req.user)) {
        res.json(401, { error: 'Please sign in' });
        return;
    }

    next();
};

router.get('/users/', requestHandler(api.users.browse));
router.get('/users/:id/', requestHandler(api.users.read));
router.get('/users/:id/stats', requestHandler(api.users.stats));
router.get('/users/:id/', requestHandler(api.users.profile));
router.put('/users/:id/', requestHandler(api.users.edit));

router.get('/actions/', requestHandler(api.actions.browse));
router.get('/actions/:id/', requestHandler(api.actions.read));
router.put('/actions/:id/', requestHandler(api.actions.edit));

router.get('/action-types/', requestHandler(api.actionTypes.browse));
router.get('/action-types/:id/', requestHandler(api.actionTypes.read));
router.put('/action-types/:id/', authAPI, requestHandler(api.actionTypes.edit));

router.get('/categories/', requestHandler(api.categories.browse));
router.get('/categories/:id/', requestHandler(api.categories.read));
router.put('/categories/:id/', authAPI, requestHandler(api.categories.edit));

router.get('/checkups/', requestHandler(api.checkups.browse));
router.get('/checkup/collaborators', requestHandler(api.checkups.checkups_collaborators));
router.get('/checkups/:id/', requestHandler(api.checkups.read));
router.get('/checkup/vote-up/:id', authAPI, requestHandler(api.checkups.voteUp));
router.get('/checkup/vote-down/:id', authAPI, requestHandler(api.checkups.voteDown));
router.put('/checkups/:id/', authAPI, requestHandler(api.checkups.edit));
router.post('/checkups/', authAPI, requestHandler(api.checkups.add));

router.get('/checkup-users/', requestHandler(api.checkupUsers.browse));
router.get('/checkup-users/:id/', requestHandler(api.checkupUsers.read));
router.put('/checkup-users/:id/', authAPI, requestHandler(api.checkupUsers.edit));

router.get('/comments/', requestHandler(api.comments.browse));
router.get('/comments/:id/', requestHandler(api.comments.read));
router.put('/comments/:id/', authAPI, requestHandler(api.comments.edit));

router.get('/contexts/', requestHandler(api.contexts.browse));
router.get('/contexts/:id/', requestHandler(api.contexts.read));
router.put('/contexts/:id/', authAPI, requestHandler(api.contexts.edit));
router.post('/contexts/', authAPI, requestHandler(api.contexts.add));

router.get('/entities/', requestHandler(api.entities.browse));
router.get('/entities/:id/', requestHandler(api.entities.read));
router.put('/entities/:id/', authAPI, requestHandler(api.entities.edit));

router.get('/entity-relations/', requestHandler(api.entityRelations.browse));
router.get('/entity-relations/:id/', requestHandler(api.entityRelations.read));
router.put('/entity-relations/:id/', authAPI, requestHandler(api.entityRelations.edit));

router.get('/entity-types/', requestHandler(api.entityTypes.browse));
router.get('/entity-types/:id/', requestHandler(api.entityTypes.read));
router.put('/entity-types/:id/', authAPI, requestHandler(api.entityTypes.edit));

router.get('/inputs/', requestHandler(api.inputs.browse));
router.get('/inputs/:id/', requestHandler(api.inputs.read));
router.put('/inputs/:id/', authAPI, requestHandler(api.inputs.edit));

router.get('/qualifications/', requestHandler(api.qualifications.browse));
router.get('/qualifications/:id/', requestHandler(api.qualifications.read));
router.put('/qualifications/:id/', authAPI, requestHandler(api.qualifications.edit));

router.get('/quotes/', requestHandler(api.quotes.browse));
router.get('/quotes/:id/', requestHandler(api.quotes.read));
router.put('/quotes/:id/', authAPI, requestHandler(api.quotes.edit));

router.get('/rates/', requestHandler(api.rates.browse));
router.get('/rates/checkup/:checkup_id', requestHandler(api.rates.ratesByCheckup));
router.get('/rates/:id/', requestHandler(api.rates.read));
router.put('/rates/:id/', authAPI, requestHandler(api.rates.edit));
router.post('/rates/', authAPI, requestHandler(api.rates.add));
router.post('/rates/:id', authAPI, requestHandler(api.rates.add));

router.get('/relation-types/', requestHandler(api.relationTypes.browse));
router.get('/relation-types/:id/', requestHandler(api.relationTypes.read));
router.put('/relation-types/:id/', authAPI, requestHandler(api.relationTypes.edit));

router.get('/role-types/', requestHandler(api.roleTypes.browse));
router.get('/role-types/:id/', requestHandler(api.roleTypes.read));
router.put('/role-types/:id/', authAPI, requestHandler(api.roleTypes.edit));

router.get('/scores/', requestHandler(api.scores.browse));
router.get('/scores/:id/', requestHandler(api.scores.read));
router.put('/scores/:id/', authAPI, requestHandler(api.scores.edit));

router.get('/checkups/:checkup_id/sources', requestHandler(api.sources.browse));
router.get('/sources/', requestHandler(api.sources.browse));
router.get('/sources/:id/', requestHandler(api.sources.read));
router.put('/sources/:id/', authAPI, requestHandler(api.sources.edit));
router.post('/sources/', authAPI, requestHandler(api.sources.add));

router.get('/source-types/', requestHandler(api.sourceTypes.browse));
router.get('/source-types/:id/', requestHandler(api.sourceTypes.read));
router.put('/source-types/:id/', authAPI, requestHandler(api.sourceTypes.edit));

module.exports = router;
