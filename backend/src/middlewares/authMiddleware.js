import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authMiddleware = async (req, res, next) => {

  try {

    // 🍪 Leer token desde cookies
    const token = req.cookies.token;

    if (!token) {

      return res.status(401).json({
        message: 'Token no proporcionado'
      });

    }

    // 🔐 Verificar token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // 👤 Buscar usuario
    const user = await User.findByPk(decoded.id);

    if (!user) {

      return res.status(401).json({
        message: 'Usuario no válido'
      });

    }

    // ✅ Inyectar usuario
    req.user = user;

    next();

  } catch (error) {

    return res.status(401).json({
      message: 'No autorizado',
      error: error.message
    });

  }
};