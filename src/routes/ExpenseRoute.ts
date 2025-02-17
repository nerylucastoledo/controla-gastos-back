import { Router } from 'express';
import ExpenseController from '../controllers/ExpenseController';

const router = Router();

router.get('/expenses/year/:username/:year', ExpenseController.findByusernameAndYear);
router.get('/expenses/:username/:date', ExpenseController.findDatabyUsernameAndDate);
router.get('/expenses/:username/:date/:card', ExpenseController.findDataByUsernameDateAndCard);

router.post('/expenses', ExpenseController.createExpense);
router.put('/expenses/', ExpenseController.updateExpense);
router.delete('/expenses/:id', ExpenseController.deleteExpense);

export default router;