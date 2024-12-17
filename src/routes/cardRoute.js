const express = require('express');
const CardContoller = require('../controllers/cardController');
const router = express.Router();

router.post('/cards', CardContoller.createCard);
router.get('/cards/:username', CardContoller.getAllCards);
router.put('/cards/', CardContoller.updateCard);
router.delete('/cards/:id', CardContoller.deleteCard);

module.exports = router;