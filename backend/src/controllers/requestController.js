import Request from '../models/Request.js';
import Project from '../models/Project.js';

export const getRequests = async (req, res) => {
  const projects = await Project.findAll({
    where: { id_user: req.user.id },
    attributes: ['id']
  });

  const ids = projects.map(p => p.id);

  const requests = await Request.findAll({
    where: { id_project: ids }
  });

  res.json(requests);
};

export const getRequest = async (req, res) => {
  const request = await Request.findByPk(req.params.id);

  if (!request) {
    return res.status(404).json({ message: 'Solicitud no encontrada' });
  }

  const project = await Project.findOne({
    where: {
      id: request.id_project,
      id_user: req.user.id
    }
  });

  if (!project) {
    return res.status(403).json({ message: 'Acceso denegado' });
  }

  res.json(request);
};

export const createRequest = async (req, res) => {
  const project = await Project.findOne({
    where: {
      id: req.body.id_project,
      id_user: req.user.id
    }
  });

  if (!project) {
    return res.status(403).json({ message: 'Proyecto no válido' });
  }

  const request = await Request.create(req.body);

  res.status(201).json(request);
};

export const updateRequest = async (req, res) => {
  const request = await Request.findByPk(req.params.id);

  if (!request) {
    return res.status(404).json({ message: 'Solicitud no encontrada' });
  }

  const project = await Project.findOne({
    where: {
      id: request.id_project,
      id_user: req.user.id
    }
  });

  if (!project) {
    return res.status(403).json({ message: 'Acceso denegado' });
  }

  await request.update(req.body);

  res.json(request);
};

export const deleteRequest = async (req, res) => {
  const request = await Request.findByPk(req.params.id);

  if (!request) {
    return res.status(404).json({ message: 'Solicitud no encontrada' });
  }

  const project = await Project.findOne({
    where: {
      id: request.id_project,
      id_user: req.user.id
    }
  });

  if (!project) {
    return res.status(403).json({ message: 'Acceso denegado' });
  }

  await request.destroy();

  res.json({ message: 'Solicitud eliminada' });
};