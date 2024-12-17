const UserService = require("../services/userService");
const { validateFields } = require("../utils/validators");

class UserController {
	static async createUser(req, res) {
		const { name, salary, username, email } = req.body;

		if (!validateFields([name, salary, username, email])) {
			return res.status(400).json({ 
				message: "Você deve preencher todos os campos" }
			);
		}

		try {
			const response = await UserService.createUser(req.body);
			res.status(201).json(response);

		} catch (error) {
				res.status(400).json({ message: error.message });
		}
	}

	static async findByEmail(req, res) {
		try {
			const email = req.params.email;
			const users = await UserService.findByEmail(email);
      res.json(users);
		
    } catch (error) {
      res.status(500).json({ 
				message: error.message 
			});
    }
  }

	static async updateUser(req, res) {
		const email = req.params.email;
		const { name, salary } = req.body;

		if (!validateFields([name, salary])) {
			return res.status(400).json({ 
				message: "O campo nome e salário não podem ser vazio" }
			);
		}

		try {
			const response = await UserService.updateNameAndSalary(email, req.body);
      res.json(response);
		
    } catch (error) {
      res.status(500).json({ 
				message: error.message 
			});
    }
  }

	static async deleteUser(req, res) {
		const email = req.params.email;

		if (!validateFields([email])) {
			return res.status(400).json({ 
				message: "O email não pode ser vazio" }
			);
		}

		try {
			const response = await UserService.deleteUser(email);
      res.json(response);
		
    } catch (error) {
      res.status(500).json({ 
				message: error.message 
			});
    }
  }
}

module.exports = UserController;