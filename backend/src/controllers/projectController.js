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
  const project = await Project.create({
    ...req.body,
    id_user: req.user.id
  });

  res.status(201).json(project);
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