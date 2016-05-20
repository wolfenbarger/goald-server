var FacebookTokenStrategy = require('passport-facebook-token');
var models = require('../models');



module.exports = function(passport) {
    // serializes user for session
    passport.serializeUser(function(user, done) {
        done(null, user.facebook_id);
    });

    // deserializes user
    passport.deserializeUser(function(id, done) {
        models.User.findOne({
          where: {facebook_id: id}
        }).then(function(user) {
            done(null, user);
        }).catch(function(error) {
            done(error, null);
        });
    });

    passport.use(new FacebookTokenStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET
      }, function(accessToken, refreshToken, profile, done) {
        models.User.findOne({
          where: { facebook_id: profile.id }
        }).then(function(user) {
          if (user) {
            return done(null, user);
          } else {
            var newUser = {
                facebook_id: profile.id,
                facebook_access_token: accessToken,
                facebook_referesh_token: refreshToken,
                email: profile.emails[0].value,
                name: profile.displayName
            };
            return models.User.create(newUser).then(function(createdUser) {
                return done(null, createdUser);
            }); // don't catch error
          }
        }).catch(function(error) {
            return done(error);
        });
      }
    ));
}