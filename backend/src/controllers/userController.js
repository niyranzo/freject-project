import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const getUsers = async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: ['id', 'name', 'email']
  });

  res.json(user);
};

export const getUser = async (req, res) => {
  if (Number(req.params.id) !== req.user.id) {
    return res.status(403).json({ message: 'Acceso denegado' });
  }

  const user = await User.findByPk(req.user.id, {
    attributes: ['id', 'name', 'email']
  });

  res.json(user);
};

export const updateUser = async (req, res) => {
  const user = await User.findByPk(req.user.id);

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  const data = { ...req.body };

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  await user.update(data);

  res.json({
    message: 'Usuario actualizado',
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
};

export const deleteUser = async (req, res) => {
  const user = await User.findByPk(req.user.id);

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  await user.destroy();

  res.json({ message: 'Usuario eliminado' });
};
