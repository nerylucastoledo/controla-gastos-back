const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.put('/users/:email', UserController.updateNameAndSalary);
router.delete('/users/:email', UserController.deleteUser);

module.exports = router;