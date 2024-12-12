const express = require('express');
const CategoryController = require('../controllers/categoryController');
const router = express.Router();

router.post('/categorys', CategoryController.createCategory);
router.get('/categorys/:username', CategoryController.getAllCategorys);
router.put('/categorys/', CategoryController.updateCategoryName);
router.delete('/categorys/:id', CategoryController.deleteCategory);

module.exports = router;