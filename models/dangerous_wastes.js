const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const dangerous_wastes = sequelize.define('dangerous_wastes', {
  dw_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name_spanish: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  name_english: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  article: {
    type: DataTypes.STRING(31),
    allowNull: true
  },
  container_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  area_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  field_c: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  field_r: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  field_e: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  field_t: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  field_te: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  field_th: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  field_tt: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  field_i: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  field_b: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  field_m: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  }
}, {
  tableName: 'dangerous_wastes',
  timestamps: false
});

module.exports = dangerous_wastes;