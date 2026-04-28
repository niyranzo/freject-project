import Cost from '../models/Cost.js';
import Project from '../models/Project.js';

export const getCosts = async (req, res) => {
  const projects = await Project.findAll({
    where: { id_user: req.user.id },
    attributes: ['id']
  });

  const ids = projects.map(p => p.id);

  const costs = await Cost.findAll({
    where: { id_project: ids }
  });

  res.json(costs);
};

export const getCost = async (req, res) => {
  const cost = await Cost.findByPk(req.params.id);

  if (!cost) {
    return res.status(404).json({ message: 'Coste no encontrado' });
  }

  const project = await Project.findOne({
    where: {
      id: cost.id_project,
      id_user: req.user.id
    }
  });

  if (!project) {
    return res.status(403).json({ message: 'Acceso denegado' });
  }

  res.json(cost);
};

export const createCost = async (req, res) => {
  const project = await Project.findOne({
    where: {
      id: req.body.id_project,
      id_user: req.user.id
    }
  });

  if (!project) {
    return res.status(403).json({ message: 'Proyecto no válido' });
  }

  const cost = await Cost.create(req.body);

  res.status(201).json(cost);
};

export const updateCost = async (req, res) => {
  const cost = await Cost.findByPk(req.params.id);

  if (!cost) {
    return res.status(404).json({ message: 'Coste no encontrado' });
  }

  const project = await Project.findOne({
    where: {
      id: cost.id_project,
      id_user: req.user.id
    }
  });

  if (!project) {
    return res.status(403).json({ message: 'Acceso denegado' });
  }

  await cost.update(req.body);

  res.json(cost);
};

export const deleteCost = async (req, res) => {
  const cost = await Cost.findByPk(req.params.id);

  if (!cost) {
    return res.status(404).json({ message: 'Coste no encontrado' });
  }

  const project = await Project.findOne({
    where: {
      id: cost.id_project,
      id_user: req.user.id
    }
  });

  if (!project) {
    return res.status(403).json({ message: 'Acceso denegado' });
  }

  await cost.destroy();

  res.json({ message: 'Coste eliminado' });
};