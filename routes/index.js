module.exports = function(app, passport) {
	require('./api')(app, passport);
	app.get('*', function(req, res) {
		res.status(404).end();
	});
}