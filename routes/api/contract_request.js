var models = require('../../models');

module.exports = function(app) {

    app.get('/contract_requests', function(req, res) {
        var query = req.query ? req.query : {};
        console.log(query);
        models.ContractRequest.findAll({
            where: query
        }).then(function(requests) {
            if (!requests) {
                res.status(418).end();
                return
            }
            res.json(requests);
        });
    });
}