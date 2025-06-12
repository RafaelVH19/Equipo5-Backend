const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const areas = sequelize.define('areas', {
  area_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  area: {
    type: DataTypes.STRING(15),
    allowNull: false
  }
}, {
  tableName: 'areas',
  timestamps: false
});

module.exports = areas;