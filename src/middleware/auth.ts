// src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import FirebaseService from '../config/firebase';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const idToken = req.cookies.access_token; 

  if (!idToken) {
    return res.status(403).json({ error: 'No token provided' });
  }

  try {
    const decodedToken = await FirebaseService.getAdminInstance().auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.clearCookie('access_token', {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
    });
    return res.status(401).send({ message: 'Token inválido ou expirado.', error: 403, ok: false });
  }
};

export default authMiddleware;