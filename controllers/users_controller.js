const User = require('../models/user');
// this is one controller which can control many users

module.exports.profile = function(req, res){
    // res.end('<h1>User Profile</h1>');
    return res.render('users', {
        title: 'User', 
    })
}

// render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }

    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    })
}

// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }

    return res.render('user_sign_in', {
        title: "Codieal | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('Error in finding user in siging up');
            return;
        }

        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('Error in creating user while siging up');
                    return;
                }
                        
                return res.redirect('/users/sign-in')
            })
        }else{
            return res.redirect('back')
        }
    });
    
}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/')
}

// sign out
module.exports.destroySession = function(req, res, next){
    // logout function given by passport
    req.logout(function(err){
        if(err) {return next(err)}
        
        // redirecting to the homepage
        return res.redirect('/')
    });
}