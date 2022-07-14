const express = require('express');

const router = express.Router();

// import passport
const passport = require('passport');
const usersController = require('../controllers/users_controller')

// map a route to the users_controller's profile action
// router.get('/profile', usersController.profile);

// if the user is not signed in 
router.get('/profile', passport.checkAuthentication, usersController.profile);

router.get('/sign-up', usersController.signUp);

router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
) , usersController.createSession);

router.get('/sign-out', usersController.destroySession);

module.exports = router;