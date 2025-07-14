import { Request, Response, NextFunction } from 'express';
import FirebaseService from '../infrastructure/firebase';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const idToken = req.headers.authorization;

  if (!idToken) {
    return res.status(403).json({ error: 'Nenhum token fornecido.' });
  }

  try {
    const decodedToken = await FirebaseService.getAdminInstance().auth().verifyIdToken(idToken);
    console.log(decodedToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    await FirebaseService.logoutUser();
    return res.status(401).send({ message: 'Token inválido ou expirado.', error: 403, ok: false });
  }
};

export default authMiddleware;