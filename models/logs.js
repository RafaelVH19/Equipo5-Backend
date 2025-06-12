const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const logs = sequelize.define('logs', {
  log_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  log_action: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  register_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'logs',
  timestamps: false
});

module.exports = logs;