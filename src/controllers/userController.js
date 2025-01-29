const UserService = require("../services/userService");

class UserController {
	static async updateNameAndSalary(req, res) {
		try {
			const result = await UserService.updateNameAndSalary(req.params.email, req.body);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

	static async deleteUser(req, res) {
		try {
			const result = await UserService.deleteUser(req.params.email);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = UserController;