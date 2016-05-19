module.exports = function(app, passport) {
	require('./authentication')(app, passport);
}