const CardService = require("../services/cardService");

class CardController {
	static async createCard(req, res) {
		try {
			const result = await CardService.createCard(req.body);
			res.status(201).json(result);
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	}

	static async getAllCards(req, res) {
		try {
			const result = await CardService.getAllCards(req.params.username);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

	static async updateCard(req, res) {
		try {
			const response = await CardService.updateCard(req.body);
      res.json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

	static async deleteCard(req, res) {
		try {
			const response = await CardService.deleteCard(req.params.id);
      res.json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = CardController;