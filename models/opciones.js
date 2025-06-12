const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const opciones = sequelize.define('opciones', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tipo: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  valor: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  orden: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'opciones',
  timestamps: false
});

module.exports = opciones;