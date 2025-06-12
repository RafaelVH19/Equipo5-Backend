const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const registers = sequelize.define('registers', {
  register_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  waste_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  responsible: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  dw_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  transporter_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  receptor_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  date_in: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  date_out: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
}, {
  tableName: 'registers',
  timestamps: false
});

module.exports = registers;