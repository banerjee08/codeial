const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller')

// access the function in home_controller.js
router.get('/', homeController.home )

// access home_controller's actions
router.use('/users', require('./users'))

router.use('/posts', require('./posts'))

// how to control all the routes or have a list of all the routes

// for any further routes, access from here
// router.use('/routerName' , require('./routerfile'));

// access posts_controller's actions
// const postsController = require('../controllers/posts_controller')
// router.get('/',);
// router.get('/', postsController.posts);
router.use('/posts', require('./posts'))

// exports the module of router
module.exports = router;