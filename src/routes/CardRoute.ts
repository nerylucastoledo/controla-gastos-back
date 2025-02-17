import { Router } from 'express';
import CardController from '../controllers/CardController';

const router = Router();

router.post('/cards', CardController.createCard);
router.get('/cards/:username', CardController.getAllCards);
router.put('/cards/', CardController.updateCard);
router.delete('/cards/:id', CardController.deleteCard);

export default router;