const CardService = require("../services/cardService");
const ExpenseService = require("../services/expenseService");

class ExpenseController {
	static async createExpense(req, res) {
		try {
			if (req.body.installments > 1) {
				const result = await ExpenseService.createExpensesInstallments(req.body);
				return res.status(201).json(result);
			}

			const result = await ExpenseService.createExpense(req.body);
			res.status(201).json(result);
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	}

	static async findDatabyUsernameAndDate(req, res) {
		try {
			const { username, date } = req.params;
			const expenses = await ExpenseService.findDatabyUsernameAndDate(username, date);
			const cards = await CardService.getAllCards(username);
			const respose = {
				data: {
					expenses: expenses.data,
					cards: cards.data
				}
			}

			res.json(respose)
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

	static async findDataByUsernameDateAndCard(req, res) {
		try {
			const result = await ExpenseService.findDataByUsernameDateAndCard(req.params);
			res.json(result)
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

	static async findByusernameAndYear(req, res) {
		try {
			const result = await ExpenseService.findDataByUsernameAndYear(req.params);
      res.json(result);
    } catch (error) {
			res.status(500).json({ message: error.message });
    }
  }

	static async updateExpense(req, res) {
		try {
			const result = await ExpenseService.updateExpense(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

	static async deleteExpense(req, res) {
		try {
			const result = await ExpenseService.deleteExpense(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ExpenseController;