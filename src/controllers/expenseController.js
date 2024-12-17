const ExpenseService = require("../services/expenseService");
const { validateFields } = require("../utils/utils");

class ExpenseController {
	static async createExpense(req, res) {
		const { username, date, people, category, value, item, card, installments } = req.body;

		if (!validateFields([username, date, people, category, value, item, card, installments])) {
			return res.status(400).json({ 
				message: "Você deve preencher todos os campos" }
			);
		}

		try {
			let response;

			if (installments > 1) {
				response = await ExpenseService.createExpensesInstallments(req.body);
			} else {
				response = await ExpenseService.createExpense(req.body);
			}

			res.status(201).json(response);

		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	}

	static async findDatabyUsernameAndDate(req, res) {
		try {
			const { username, date } = req.params;
			const response = await ExpenseService.findDatabyUsernameAndDate(username, date);
      res.json(response);
		
    } catch (error) {
      res.status(500).json({ 
				message: error.message 
			});
    }
  }

	static async findDataByUsernameAndYear(req, res) {
		try {
			const { username, year } = req.params;
			const response = await ExpenseService.findDataByUsernameAndYear(username, year);
      res.json(response);
		
    } catch (error) {
      res.status(500).json({ 
				message: error.message 
			});
    }
  }

	static async updateExpense(req, res) {
		const { _id, category, value, item } = req.body;

		if (!validateFields([_id, category, value, item])) {
			return res.status(400).json({ 
				message: "Você deve preencher todos os campos" }
			);
		}

		try {
			const response = await ExpenseService.updateExpense(_id, category, value, item);
      res.json(response);
		
    } catch (error) {
      res.status(500).json({ 
				message: error.message 
			});
    }
  }

	static async deleteExpense(req, res) {
		const { id } = req.params;

		if (!validateFields([id])) {
			return res.status(400).json({ 
				message: "O ID não pode ser vazio" }
			);
		}

		try {
			const response = await ExpenseService.deleteExpense(id);
      res.json(response);
		
    } catch (error) {
      res.status(500).json({ 
				message: error.message 
			});
    }
  }
}

module.exports = ExpenseController;