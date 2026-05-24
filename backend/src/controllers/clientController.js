import { Project, Client, } from "../models/index.js";

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

export const getClientByProject = async (req,res) => {
  const project = await Project.findByPk(
    req.params.projectId,
    {
      include: {
        model: Client,
        as: "client",
      }
    }
  );

  if (!project || !project.Client) {
    return res.status(404).json({
      message:
        "Cliente no encontrado para este proyecto"
    });
  }

  res.json(project.Client);
};

export const createClient = async (req, res) => {
   try{
    const { name, email, company } = req.body;
    
    if (!name || !email || !company) {
      return res.status(400).json({
        message: "Se requieren nombre, email y empresa para crear el cliente"
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

      return res.status(400).json({
        message:"El email no es válido"
      });
    }

    const client = await Client.create({
      ...req.body,
      id_user: req.user.id
    });

    res.status(201).json(client);

   } catch (error) {
    res.status(500).json({
      message: "Error creando el cliente"
    });
  }
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

  const projects = await Project.findOne({
    where: {
      id_client: client.id
    }
  });

  if (projects) {

    return res.status(400).json({
      message:
        'No puedes eliminar este cliente porque tiene proyectos asociados'
    });

  }

  await client.destroy();

  res.json({ message: 'Cliente eliminado' });
};
