import Client from '../models/Client.js';

export const getClients = async (req, res) => {
  const clients = await Client.findAll({
    where: { id_user: req.user.id }
  });

  res.json(clients);
};

export const getClient = async (req, res) => {
  const client = await Client.findOne({
    where: {
      id: req.params.id,
      id_user: req.user.id
    }
  });

  if (!client) {
    return res.status(404).json({ message: 'Cliente no encontrado' });
  }

  res.json(client);
};

export const createClient = async (req, res) => {
  const client = await Client.create({
    ...req.body,
    id_user: req.user.id
  });

  res.status(201).json(client);
};

export const updateClient = async (req, res) => {
  const client = await Client.findOne({
    where: {
      id: req.params.id,
      id_user: req.user.id
    }
  });

  if (!client) {
    return res.status(404).json({ message: 'Cliente no encontrado' });
  }

  await client.update(req.body);

  res.json(client);
};

export const deleteClient = async (req, res) => {
  const client = await Client.findOne({
    where: {
      id: req.params.id,
      id_user: req.user.id
    }
  });

  if (!client) {
    return res.status(404).json({ message: 'Cliente no encontrado' });
  }

  await client.destroy();

  res.json({ message: 'Cliente eliminado' });
};
