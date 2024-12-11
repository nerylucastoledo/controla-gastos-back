const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();

router.post('/users', UserController.createUser);
router.get('/users/:email', UserController.findByEmail);
router.put('/users/:email', UserController.updateUser);
router.delete('/users/:email', UserController.deleteUser);

module.exports = router;