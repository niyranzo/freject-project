import { sequelize } from '../config/db.js';

import User from './User.js';
import Client from './Client.js';
import Project from './Project.js';
import Task from './Task.js';
import Request from './Request.js';
import Cost from './Cost.js';

/* =========================
   USER RELATIONS
========================= */

// Un usuario tiene muchos clientes
User.hasMany(Client, {
  foreignKey: 'id_user'
});
Client.belongsTo(User, {
  foreignKey: 'id_user'
});

// Un usuario tiene muchos proyectos
User.hasMany(Project, {
  foreignKey: 'id_user'
});
Project.belongsTo(User, {
  foreignKey: 'id_user'
});

/* =========================
   CLIENT RELATIONS
========================= */

// Un cliente tiene muchos proyectos
Client.hasMany(Project, {
  foreignKey: 'id_client'
});
Project.belongsTo(Client, {
  foreignKey: 'id_client'
});

/* =========================
   PROJECT RELATIONS
========================= */

// Un proyecto tiene muchas tareas
Project.hasMany(Task, {
  foreignKey: 'id_project'
});
Task.belongsTo(Project, {
  foreignKey: 'id_project'
});

// Un proyecto tiene muchas solicitudes
Project.hasMany(Request, {
  foreignKey: 'id_project'
});
Request.belongsTo(Project, {
  foreignKey: 'id_project'
});

// Un proyecto tiene muchos costes
Project.hasMany(Cost, {
  foreignKey: 'id_project'
});
Cost.belongsTo(Project, {
  foreignKey: 'id_project'
});

/* =========================
   EXPORTS
========================= */

export {
  User,
  Client,
  Project,
  Task,
  Request,
  Cost,
  sequelize
};