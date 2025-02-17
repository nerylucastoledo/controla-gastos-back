import { Request, Response } from 'express';
import PeopleService from '../services/PeopleService';
import { IPeopleCreate } from '../utils/types';

class PeopleContoller {
	public static async createPeople(req: Request<IPeopleCreate>, res: Response): Promise<void> {
		try {
			const result = await PeopleService.createPeople(req.body);
			res.status(201).json(result);
		} catch (error) {
			res.status(400).json({ 
        message: error instanceof Error ? error.message : 'Erro interno.' 
      });
		}
	}

	public static async getAllPeoples(req: Request<{ username: string }>, res: Response): Promise<void> {
		try {
			const { username } = req.params;
			const result = await PeopleService.getAllPeoples(username);
      res.json(result);
    } catch (error) {
      res.status(400).json({ 
        message: error instanceof Error ? error.message : 'Erro interno.' 
      });
    }
  }

	public static async updatePeopleName(req: Request, res: Response): Promise<void> {
		try {
			const result = await PeopleService.updatePeopleName(req.body);
      res.json(result);
    } catch (error) {
      res.status(400).json({ 
        message: error instanceof Error ? error.message : 'Erro interno.' 
      });
    }
  }

	public static async deletePeople(req: Request<{ id: string }>, res: Response): Promise<void> {
		try {
			const { id } = req.params
			const response = await PeopleService.deletePeople(id);
      res.json(response);
    } catch (error) {
			res.status(400).json({ 
        message: error instanceof Error ? error.message : 'Erro interno.' 
      });
    }
  }
}

export default PeopleContoller