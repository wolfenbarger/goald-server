function requireAuthentication(req, res, next) {
	if (!req.isAuthenticated()) {
        res.status(403).end();
        return;
    }
    next();
}
        

module.exports = function(app, passport) {
	require('./authentication')(app, passport);
	app.use(requireAuthentication)
	require('./user')(app);
	require('./contract_request')(app);
}