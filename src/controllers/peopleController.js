const PeopleService = require("../services/peopleService");
const { validateFields } = require("../utils/validators");

class PeopleContoller {
	static async createPeople(req, res) {
		const { name, username } = req.body;

		if (!validateFields([name, username])) {
			return res.status(400).json({ 
				message: "Você deve preencher todos os campos" }
			);
		}

		try {
			const response = await PeopleService.createPeople(req.body);
			res.status(201).json(response);

		} catch (error) {
				res.status(400).json({ message: error.message });
		}
	}

	static async getAllPeoples(req, res) {
		try {
			const { username } = req.params;
			const peoples = await PeopleService.getAllPeoples(username);
      res.json(peoples);
		
    } catch (error) {
      res.status(500).json({ 
				message: error.message 
			});
    }
  }

	static async updatePeopleName(req, res) {
		const { _id, name } = req.body;

		if (!validateFields([_id, name])) {
			return res.status(400).json({ 
				message: "Você deve preencher todos os campos" }
			);
		}

		try {
			const response = await PeopleService.updatePeopleName(_id, name);
      res.json(response);
		
    } catch (error) {
      res.status(500).json({ 
				message: error.message 
			});
    }
  }

	static async deletePeople(req, res) {
		const { id } = req.params;

		if (!validateFields([id])) {
			return res.status(400).json({ 
				message: "O ID não pode ser vazio" }
			);
		}

		try {
			const response = await PeopleService.deletePeople(id);
      res.json(response);
		
    } catch (error) {
      res.status(500).json({ 
				message: error.message 
			});
    }
  }
}

module.exports = PeopleContoller;