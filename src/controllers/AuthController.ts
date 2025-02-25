import { Request, Response } from 'express';
import AuthService from '../services/AuthService';
import { IAuthCreate, IAuthLogin } from "../utils/types";

class AuthController {
  public static async registerUser(req: Request<IAuthCreate>, res: Response): Promise<void> {
		try {
			const result = await AuthService.registerUser(req.body);
			res.status(201).json(result);
		} catch (error) {
			res.status(400).json({ 
        message: error instanceof Error ? error.message : 'Erro interno.' 
      });
		}
	}

	public static async loginUser(req: Request<IAuthLogin>, res: Response): Promise<void> {
		try {
			const result = await AuthService.loginUser(req.body);
			res.cookie('access_token', result.token, {
  			httpOnly: false,
				secure: true,
    		sameSite: 'none',
				path: '/',
			})
			.status(200)
			.json(result);

		} catch (error) {
			res.status(400).json({ 
        message: error instanceof Error ? error.message : 'Erro interno.' 
      });
		}
	}

  public static async logoutUser(req: Request, res: Response): Promise<void> {
    try {
      const response = await AuthService.logoutUser();
      res.clearCookie('access_token')
			.status(200)
			.json(response);

    } catch (error) {
      res.status(400).json({ 
        message: error instanceof Error ? error.message : 'Erro interno.' 
      });
    }
  }

	public static async token(req: Request, res: Response): Promise<void> {
    try {
      const response = await AuthService.token();
      res.status(201).json(response);
    } catch (error) {
      res.status(400).json({ 
        message: error instanceof Error ? error.message : 'Erro interno.' 
      });
    }
  }
}

export default AuthController