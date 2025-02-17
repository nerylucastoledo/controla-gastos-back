import { Request, Response } from 'express';
import ExpenseService from '../services/ExpenseService';
import CardService from '../services/CardService';
import { IExpenseCreate, IExpenseUpdate } from "../utils/types";

class ExpenseController {
	public static async createExpense(req: Request<IExpenseCreate>, res: Response): Promise<void> {
		try {
			if (req.body.installments > 1) {
				const result = await ExpenseService.createExpensesInstallments(req.body);
				res.status(201).json(result);
			}

			const result = await ExpenseService.createExpense(req.body);
			res.status(201).json(result);
		} catch (error) {
			res.status(400).json({ 
        message: error instanceof Error ? error.message : 'Erro interno.' 
      });
		}
	}

	public static async findDatabyUsernameAndDate(req: Request<{ username: string, date: string }>, res: Response): Promise<void> {
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
      res.status(400).json({ 
        message: error instanceof Error ? error.message : 'Erro interno.' 
      });
    }
  }

	public static async findDataByUsernameDateAndCard(req: Request<{ username: string, date: string, card: string }>, res: Response): Promise<void> {
		try {
			const { username, date, card } = req.params
			const result = await ExpenseService.findDataByUsernameDateAndCard(username, date, card);
			res.json(result)
    } catch (error) {
      res.status(400).json({ 
        message: error instanceof Error ? error.message : 'Erro interno.' 
      });
    }
  }

	public static async findByusernameAndYear(req: Request<{ username: string, year: string }>, res: Response): Promise<void> {
		try {
			const { username, year } = req.params
			const result = await ExpenseService.findDataByUsernameAndYear(username, year);
      res.json(result);
    } catch (error) {
			res.status(400).json({ 
        message: error instanceof Error ? error.message : 'Erro interno.' 
      });
    }
  }

	public static async updateExpense(req: Request<IExpenseUpdate>, res: Response): Promise<void> {
		try {
			const result = await ExpenseService.updateExpense(req.body);
      res.json(result);
    } catch (error) {
      res.status(400).json({ 
        message: error instanceof Error ? error.message : 'Erro interno.' 
      });
    }
  }

	public static async deleteExpense(req: Request<{ id: string }>, res: Response): Promise<void> {
		try {
			const { id } = req.params
			const result = await ExpenseService.deleteExpense(id);
      res.json(result);
    } catch (error) {
      res.status(400).json({ 
        message: error instanceof Error ? error.message : 'Erro interno.' 
      });
    }
  }
}

export default ExpenseController