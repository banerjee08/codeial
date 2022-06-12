const express = require('express');

const router = express.Router();
console.log("router loaded");

const homeController = require('../controllers/home_controller')
// access the function in home_controller.js
router.get('/', )

// access home_controller's actions
router.get('/', homeController.home)

// exports the module of router
module.exports = router;