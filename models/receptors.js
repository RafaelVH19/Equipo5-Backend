const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const receptors = sequelize.define('receptors', {
  receptor_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name_reason: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  auth: {
    type: DataTypes.STRING(31),
    allowNull: true
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'receptors',
  timestamps: false
});

module.exports = receptors;