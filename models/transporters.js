const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const transporters = sequelize.define('transporters', {
  transporter_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  transporter_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  authorization_semarnat: {
    type: DataTypes.STRING(63),
    allowNull: true
  },
  authorization_sct: {
    type: DataTypes.STRING(63),
    allowNull: true
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'transporters',
  timestamps: false
});

module.exports = transporters;