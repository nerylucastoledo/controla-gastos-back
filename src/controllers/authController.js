const AuthService = require("../services/authService");

class AuthController {
  static async registerUser(req, res) {
		try {
			const result = await AuthService.registerUser(req.body);
			res.status(201).json(result);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}

	static async loginUser(req, res) {
		try {
			const result = await AuthService.loginUser(req.body);
			res.cookie('access_token', result.token, { httpOnly: true})
			.status(200)
			.json(result);

		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	}

  static async logoutUser(req, res) {
    try {
      const response = await AuthService.logoutUser();
      res.clearCookie('access_token')
			.status(200)
			.json(response);

    } catch (error) {
      res.status(500).json({ error: "Ocorreu um erro interno" });
    }
  }
}

module.exports = AuthController;