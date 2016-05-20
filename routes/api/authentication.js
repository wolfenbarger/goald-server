var FB = require('fb');

function successRedirect(req, res, next) {
    res.redirect('/login');
}

module.exports = function(app, passport) {
    app.get('/auth/facebook/token',
        passport.authenticate('facebook-token'),
        function (req, res) {
            // do something with req.user
            FB.setAccessToken(req.user.facebook_access_token);
            res.json(req.user)
        }
    );

}