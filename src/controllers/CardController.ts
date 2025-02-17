import { Request, Response } from 'express';
import CardService from '../services/CardService';
import { ICardCreate } from "../utils/types";

class CardController {
	public static async createCard(req: Request<ICardCreate>, res: Response): Promise<void> {
		try {
			const result = await CardService.createCard(req.body);
			res.status(201).json(result);
		} catch (error) {
			res.status(400).json({ 
        message: error instanceof Error ? error.message : 'Erro interno.' 
      });
		}
	}

	public static async getAllCards(req: Request<{ username: string }>, res: Response): Promise<void> {
		try {
			const { username } = req.params
			const result = await CardService.getAllCards(username);
      res.json(result);
    } catch (error) {
      res.status(400).json({ 
        message: error instanceof Error ? error.message : 'Erro interno.' 
      });
    }
  }

	public static async updateCard(req: Request<ICardCreate>, res: Response): Promise<void> {
		try {
			const response = await CardService.updateCard(req.body);
      res.json(response);
    } catch (error) {
      res.status(400).json({ 
        message: error instanceof Error ? error.message : 'Erro interno.' 
      });
    }
  }

	public static async deleteCard(req: Request<{ id: string }>, res: Response): Promise<void> {
		try {
			const { id } = req.params
			const response = await CardService.deleteCard(id);
      res.json(response);
    } catch (error) {
      res.status(400).json({ 
        message: error instanceof Error ? error.message : 'Erro interno.' 
      });
    }
  }
}

export default CardController