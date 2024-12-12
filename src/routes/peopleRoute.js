const express = require('express');
const PeopleContoller = require('../controllers/peopleController');
const router = express.Router();

router.post('/peoples', PeopleContoller.createPeople);
router.get('/peoples/:username', PeopleContoller.getAllPeoples);
router.put('/peoples/', PeopleContoller.updatePeopleName);
router.delete('/peoples/:id', PeopleContoller.deletePeople);

module.exports = router;