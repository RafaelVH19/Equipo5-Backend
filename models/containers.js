const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const containers = sequelize.define('containers', {
  container_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.STRING(15),
    allowNull: false
  }
}, {
  tableName: 'containers',
  timestamps: false
});

module.exports = containers;