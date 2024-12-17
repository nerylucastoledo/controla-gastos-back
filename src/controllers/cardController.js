const CardService = require("../services/cardService");
const { validateFields } = require("../utils/utils");

class CardController {
	static async createCard(req, res) {
		const { name, color, username } = req.body;

		if (!validateFields([name, color, username])) {
			return res.status(400).json({ 
				message: "Você deve preencher todos os campos" }
			);
		}

		try {
			const response = await CardService.createCard(req.body);
			res.status(201).json(response);

		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	}

	static async getAllCards(req, res) {
		try {
			const { username } = req.params;
			const cards = await CardService.getAllCards(username);
      res.json(cards);
		
    } catch (error) {
      res.status(500).json({ 
				message: error.message 
			});
    }
  }

	static async updateCard(req, res) {
		const { _id, name, color } = req.body;

		if (!validateFields([_id, name, color])) {
			return res.status(400).json({ 
				message: "Você deve preencher todos os campos" }
			);
		}

		try {
			const response = await CardService.updateCard(_id, name, color);
      res.json(response);
		
    } catch (error) {
      res.status(500).json({ 
				message: error.message 
			});
    }
  }

	static async deleteCard(req, res) {
		const { id } = req.params;

		if (!validateFields([id])) {
			return res.status(400).json({ 
				message: "O ID não pode ser vazio" }
			);
		}

		try {
			const response = await CardService.deleteCard(id);
      res.json(response);
		
    } catch (error) {
      res.status(500).json({ 
				message: error.message 
			});
    }
  }
}

module.exports = CardController;