var FB = require('fb');
var models = require('../../models');

module.exports = function(app) {
    app.get('/me/friends', function (req, res) {
		FB.api('me/friends', function (fbRes) {
			if(!res || res.error) {
				console.log(!res ? 'error occurred' : res.error);
				res.status(418).end();
				return;
			}
			res.json(fbRes);
		});
    });

    app.get('/me/contract_requests', function(req, res) {
        models.ContractRequest.findAll({
            where: {
                request_for: req.user.facebook_id
            }
        }).then(function(requests) {
            res.json(requests);
        });
    });

    app.put('/me/contract_request/:id', function(req, res) {
        models.ContractRequest.findOne({
            where: {
                request_for: req.user.facebook_id,
                contract_id: req.params.id
            }
        }).then(function(request) {
            if (!request) {
                res.status(418).end();
                return
            }
            request.accepted = req.body.accepted;
            request.save().then(function() {
                res.json(request);
            });
        });
    });

    app.post('/me/contract', function(req, res) {
    	req.user.createContract(req.body).then(function(contract) {
            if (contract) {
                if (req.body.holders && req.body.holders.length > 0) {
                    var contractRequests = req.body.holders.map(function(hid) {
                        return { 
                            request_for: hid, 
                            request_from: req.user.facebook_id,
                            contract_id: contract.id
                        }
                    });
                    models.ContractRequest.bulkCreate(contractRequests)
                }
                res.json(contract);
                return;
            }
    	});
    });

    app.get('/me/contract', function(req, res) {
    	req.user.getContracts().then(function(contracts) {
    		res.json(contracts);
    		return;
    	});
    });

}