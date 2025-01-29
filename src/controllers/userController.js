const UserService = require("../services/userService");

class UserController {
	static async updateNameAndSalary(req, res) {
		const email = req.params.email;

		try {
			const result = await UserService.updateNameAndSalary(email, req.body);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

	static async deleteUser(req, res) {
		const email = req.params.email;

		try {
			const result = await UserService.deleteUser(email);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = UserController;