import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_project: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  status: {
    type: DataTypes.ENUM('to_do', 'progress', 'completed'),
    defaultValue: 'to_do',
}
}, {
  tableName: 'Task',
  timestamps: false
});

export default Task;
