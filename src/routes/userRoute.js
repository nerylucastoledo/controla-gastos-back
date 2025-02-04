const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.put('/users/:username', UserController.updateSalary);
router.delete('/users/:username', UserController.deleteUser);

module.exports = router;