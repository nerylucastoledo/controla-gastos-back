import { Router } from 'express';
import PeopleController from '../controllers/PeopleController';

const router = Router();

router.post('/peoples', PeopleController.createPeople);
router.get('/peoples/:username', PeopleController.getAllPeoples);
router.put('/peoples/', PeopleController.updatePeopleName);
router.delete('/peoples/:id', PeopleController.deletePeople);

export default router;