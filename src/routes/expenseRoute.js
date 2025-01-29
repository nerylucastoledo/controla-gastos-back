const express = require('express');
const ExpenseController = require('../controllers/expenseController');
const router = express.Router();

router.get('/expenses/year/:username/:year', ExpenseController.findByusernameAndYear);
router.get('/expenses/:username/:date', ExpenseController.findDatabyUsernameAndDate);
router.get('/expenses/:username/:date/:card', ExpenseController.findDataByUsernameDateAndCard);

router.post('/expenses', ExpenseController.createExpense);
router.put('/expenses/', ExpenseController.updateExpense);
router.delete('/expenses/:id', ExpenseController.deleteExpense);

module.exports = router;