import { Request, Response } from 'express';

import UserService from "../services/UserService";

class UserController {
  public static async updateSalary(req: Request, res: Response): Promise<void> {
    try {
      const { username } = req.params;
      const { salary } = req.body;

      const result = await UserService.updateSalary(username, salary);
      res.json(result);
    } catch (error) {
      res.status(400).json({ 
        message: error instanceof Error ? error.message : 'Erro interno.' 
      });
    }
  }

  public static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { username } = req.params;

      const result = await UserService.deleteUser(username);
      res.json(result);
    } catch (error) {
      res.status(400).json({ 
        message: error instanceof Error ? error.message : 'Erro interno' 
      });
    }
  }
}

export default UserController;