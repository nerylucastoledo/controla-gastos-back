const UserService = require("../services/userService");

class UserController {
	static async updateSalary(req, res) {
		try {
			const result = await UserService.updateSalary(req.params.username, req.body);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

	static async deleteUser(req, res) {
		try {
			const result = await UserService.deleteUser(req.params.username);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = UserController;