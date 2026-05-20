import Task from '../models/Task.js';
import Project from '../models/Project.js';

export const getTasks = async (req, res) => {
  const projects = await Project.findAll({
    where: { id_user: req.user.id },
    attributes: ['id']
  });

  const ids = projects.map(p => p.id);

  const tasks = await Task.findAll({
    where: { id_project: ids }
  });

  res.json(tasks);
};

export const getTask = async (req, res) => {
  const task = await Task.findByPk(req.params.id);

  if (!task) {
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }

  const project = await Project.findOne({
    where: {
      id: task.id_project,
      id_user: req.user.id
    }
  });

  if (!project) {
    return res.status(403).json({ message: 'Acceso denegado' });
  }

  res.json(task);
};

export const getTasksByProject = async (req, res) => {
  
  const project = await Project.findOne({
    where: { id: req.params.projectId}
  });

  if (!project) {
    return res.status(403).json({ message: 'Proyecto no válido' });
  }

  const tasks = await Task.findAll({
    where: {
      id_project: req.params.projectId
    }
  });

  res.json(tasks);
};

export const createTask = async (req, res) => {
  const project = await Project.findOne({
    where: {
      id: req.body.id_project,
      id_user: req.user.id
    }
  });

  if (!project) {
    return res.status(403).json({ message: 'Proyecto no válido' });
  }

  const task = await Task.create(req.body);

  res.status(201).json(task);
};

export const updateTask = async (req, res) => {
  const task = await Task.findByPk(req.params.id);

  if (!task) {
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }

  const project = await Project.findOne({
    where: {
      id: task.id_project,
      id_user: req.user.id
    }
  });

  if (!project) {
    return res.status(403).json({ message: 'Acceso denegado' });
  }

  await task.update(req.body);

  res.json(task);
};

export const deleteTask = async (req, res) => {
  const task = await Task.findByPk(req.params.id);

  if (!task) {
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }

  const project = await Project.findOne({
    where: {
      id: task.id_project,
      id_user: req.user.id
    }
  });

  if (!project) {
    return res.status(403).json({ message: 'Acceso denegado' });
  }

  await task.destroy();

  res.json({ message: 'Tarea eliminada' });
};
