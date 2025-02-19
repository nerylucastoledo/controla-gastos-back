import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const router = Router();

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);
router.post('/logout', AuthController.logoutUser);
router.get('/token', AuthController.token);

export default router;