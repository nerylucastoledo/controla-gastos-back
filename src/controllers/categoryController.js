const CategoryService = require("../services/categoryService");
const validateFields = require("../utils/validators");

class CategoryController {
	static async createCategory(req, res) {
		const { name, username } = req.body;

		if (!validateFields([name, username])) {
			return res.status(400).json({ 
				message: "Você deve preencher todos os campos" }
			);
		}

		try {
			const response = await CategoryService.createCategory(req.body);
			res.status(201).json(response);

		} catch (error) {
				res.status(400).json({ message: error.message });
		}
	}

	static async getAllCategorys(req, res) {
		try {
			const { username } = req.params;
			const categorys = await CategoryService.getAllCategorys(username);
      res.json(categorys);
		
    } catch (error) {
      res.status(500).json({ 
				message: error.message 
			});
    }
  }

	static async updateCategoryName(req, res) {
		const { _id, name } = req.body;

		if (!validateFields([_id, name])) {
			return res.status(400).json({ 
				message: "Você deve preencher todos os campos" }
			);
		}

		try {
			const response = await CategoryService.updateCategoryName(_id, name);
      res.json(response);
		
    } catch (error) {
      res.status(500).json({ 
				message: error.message 
			});
    }
  }

	static async deleteCategory(req, res) {
		const { id } = req.params;

		if (!validateFields([id])) {
			return res.status(400).json({ 
				message: "O ID não pode ser vazio" }
			);
		}

		try {
			const response = await CategoryService.deleteCategory(id);
      res.json(response);
		
    } catch (error) {
      res.status(500).json({ 
				message: error.message 
			});
    }
  }
}

module.exports = CategoryController;