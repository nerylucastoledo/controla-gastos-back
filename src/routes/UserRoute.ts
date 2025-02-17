import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

router.put('/users/:username', UserController.updateSalary);
router.delete('/users/:username', UserController.deleteUser);

export default router;