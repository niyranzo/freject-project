import Project from '../models/Project.js';

export const getProjects = async (req, res) => {
  const projects = await Project.findAll({
    where: { id_user: req.user.id }
  });

  res.json(projects);
};

export const getProject = async (req, res) => {
  const project = await Project.findOne({
    where: {
      id: req.params.id,
      id_user: req.user.id
    }
  });

  if (!project) {
    return res.status(404).json({ message: 'Proyecto no encontrado' });
  }

  res.json(project);
};

export const createProject = async (req, res) => {
  try {

    const { name, price, id_client } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        message: "Se requieren nombre y precio para crear el proyecto"
      });
    }

    if (!id_client) {
      return res.status(400).json({
        message: "Se requiere un cliente para crear el proyecto"
      });
    }

    const project = await Project.create({
      ...req.body,
      id_user: req.user.id
    });

    res.status(201).json(project);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error creando el proyecto"
    });

  }
};

export const updateProject = async (req, res) => {
  const project = await Project.findOne({
    where: {
      id: req.params.id,
      id_user: req.user.id
    }
  });

  if (!project) {
    return res.status(404).json({ message: 'Proyecto no encontrado' });
  }

  await project.update(req.body);

  res.json(project);
};

export const deleteProject = async (req, res) => {
  const project = await Project.findOne({
    where: {
      id: req.params.id,
      id_user: req.user.id
    }
  });

  if (!project) {
    return res.status(404).json({ message: 'Proyecto no encontrado' });
  }

  await project.destroy();

  res.json({ message: 'Proyecto eliminado' });
};