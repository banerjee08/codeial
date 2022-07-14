// import library
const passport = require('passport');

// strategy
const LocalStrategy = require('passport-local').Strategy

// import user
const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    function(email, password, done){
        // find a user and establish the identity
        User.findOne({email: email}, function(err, user){
            if(err){
                console.log("error in finding user ---> Passport");
                return done(err);
            }
            
            // if user is not found or error in matching password
            if(!user || user.password != password){
                console.log('Invalid username/password');
                return done(null, false);
            }

            // if user is found
            return done(null, user);
        })
    }
));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
})

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log("error in finding user ---> Passport");
                return done(err);
        }

        return done(null, user);
    })
})

// - Check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in')
}

// set the user for the views
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the sesion cookie and we are sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;