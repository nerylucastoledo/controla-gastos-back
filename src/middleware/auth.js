const { admin } = require('../config/firebase');

const authMiddleware = async (req, res, next) => {
  const idToken = req.cookies.access_token; 

  if (!idToken) {
    return res.status(403).json({ error: 'No token provided' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log(error)
    res.clearCookie('access_token', {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
    });
    return res.status(401).send({ message: 'Token inválido ou expirado.', error: error.message, ok: false });
  }
};

module.exports = authMiddleware;