const express = require('express');
const firebaseAuthController = require('../controllers/firebaseAuthController');
const router = express.Router();

router.post('/register', firebaseAuthController.registerUser);
router.post('/login', firebaseAuthController.loginUser);
router.post('/logout', firebaseAuthController.logoutUser);

module.exports = router;