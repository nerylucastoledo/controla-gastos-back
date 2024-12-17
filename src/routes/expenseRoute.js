const express = require('express');
const ExpenseController = require('../controllers/expenseController');
const router = express.Router();

router.post('/expenses', ExpenseController.createExpense);
router.get('/expenses/:username/:date', ExpenseController.findDatabyUsernameAndDate);
router.get('/expenses/year/:username/:year', ExpenseController.findDataByUsernameAndYear);
router.put('/expenses/', ExpenseController.updateExpense);
router.delete('/expenses/:id', ExpenseController.deleteExpense);

module.exports = router;