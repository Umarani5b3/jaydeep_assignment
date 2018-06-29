/**
 * Created by Jaydeep on 6/27/2018.
 */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../app/models/user.js');

passport.serializeUser(function (user, fn) {
  fn(null, user);
});

passport.deserializeUser(function (id, fn) {
  User.findOne({id: id.id}, function (err, user) {
    fn(err, user);
  });
});

passport.use(new GoogleStrategy({
    'clientID' : '543395452730-9jsseqe2ldo6j8felh4mc9p8sh8pu6i1.apps.googleusercontent.com',
    'clientSecret' : 'Goza7NAofRy5zjgfy1Ihz_pO',
    'callbackURL' : 'http://localhost:8080/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done){
    process.nextTick(function(){
      User.findOne({'id':profile.id}, function(err, user){
        if(err) return done(err);
        if(user) return done(null, user);
        else{
          var newUser = new User();
          newUser.id = profile.id;
          newUser.token = accessToken;
          newUser.name = profile.displayName;
          newUser.email = profile.emails[0].value;
          newUser.save(function(err){
            if(err) throw err;
            return done(null, newUser);
          });
          console.log(profile);
        }
      })
    })

  }));

module.exports = passport;
