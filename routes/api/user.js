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

    app.post('/me/contract', function(req, res) {
    	req.user.createContract(req.body).then(function(contract) {
    		res.json(contract);
    		return;
    	});
    });

    app.get('/me/contract', function(req, res) {
    	req.user.getContracts().then(function(contracts) {
    		res.json(contracts);
    		return;
    	});
    });

}