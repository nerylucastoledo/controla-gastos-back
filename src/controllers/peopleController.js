const PeopleService = require("../services/peopleService");

class PeopleContoller {
	static async createPeople(req, res) {
		try {
			const result = await PeopleService.createPeople(req.body);
			res.status(201).json(result);
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	}

	static async getAllPeoples(req, res) {
		try {
			const result = await PeopleService.getAllPeoples(req.params.username);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

	static async updatePeopleName(req, res) {
		try {
			const result = await PeopleService.updatePeopleName(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

	static async deletePeople(req, res) {
		try {
			const response = await PeopleService.deletePeople(req.params.id);
      res.json(response);
    } catch (error) {
			res.status(500).json({ message: error.message });
    }
  }
}

module.exports = PeopleContoller;