var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

var yearBook = require('../db/yearBookDB');


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});


passport.use('signup', new localStrategy(
  function (req, res, username, done){
    yearBook.findOne({username: username}, function(err, alreadyExist){
      if(alreadyExist){
        res.send(401);
      }
      else {
        return done;
      } 
    });
  }
  ));

passport.use('local-signin', new localStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback : true
    },
    function (req, username, password, done) {
            yearBook.findOne({username: username, password: password}, function (err, user) {
            // console.log(user);
            if(err)
                return done(err);
            if(!user){
                console.log('User not found.');
                return done(null, false);
            }
            else{
                // successRedirect: '/loggedin'
                console.log('User found.');
                 return done(null, user);
            }
        });

  }));

var authenticateUser = {
  signin : passport.authenticate('local-signin'),
  signup :passport.authenticate('signup')
  }



module.exports = authenticateUser;
