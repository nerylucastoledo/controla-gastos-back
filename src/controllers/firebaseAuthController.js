const FirebaseService = require("../services/firebaseService");
const { validateFields } = require("../utils/utils");

class FirebaseAuthController {
  async registerUser(req, res) {
    const { email, password, salary, name, username } = req.body;

    if (!validateFields([email, password, salary, name, username])) {
			return res.status(400).json({ 
				message: "Você deve preencher todos os campos" }
			);
		}

		try {
			const response = await FirebaseService.registerUser(req.body);
			res.status(201).json(response);

		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	}

	async loginUser(req, res) {
    const { email, password } = req.body;

    if (!validateFields([email, password])) {
			return res.status(400).json({ 
				message: "Você deve preencher todos os campos" }
			);
		}

		try {
			const response = await FirebaseService.loginUser(req.body);

			res.cookie('access_token', response.token, {
				httpOnly: true
			})
			.status(200)
			.json(response);

		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	}

  async logoutUser(req, res) {
    try {
      const response = await FirebaseService.logoutUser();
      res.clearCookie('access_token')
			.status(200)
			.json(response);

    } catch (error) {
      res.status(500).json({ error: "Ocorreu um erro interno" });
    }
  }
}

module.exports = new FirebaseAuthController();