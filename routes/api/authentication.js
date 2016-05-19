function successRedirect(req, res, next) {
    res.redirect('/login');
}

module.exports = function(app, passport) {
    app.post('/auth/facebook/token',
        passport.authenticate('facebook-token'),
        function (req, res) {
            // do something with req.user
            res.sendStatus(req.user? 200 : 401);
        }
    );
    app.get('/auth/facebook/token',
        passport.authenticate('facebook-token'),
        function (req, res) {
            // do something with req.user
            res.sendStatus(req.user? 200 : 401);
        }
    );

}