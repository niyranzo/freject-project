import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Client = sequelize.define('Client', {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  company: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'Client',
  timestamps: true
});

export default Client;
