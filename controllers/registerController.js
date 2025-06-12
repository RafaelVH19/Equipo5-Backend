const registers = require('../models/registers');
const { Op, fn, col, literal } = require('sequelize'); // Add this at the top if not present

// Buscar registro por ID
exports.buscarRegisterPorId = async (req, res) => {
  const { register_id } = req.body;
  if (!register_id) {
    return res.status(400).json({ error: 'Falta el campo register_id' });
  }
  const register = await registers.findOne({ where: { register_id } });
  if (!register) return res.json(0); // Return 0 if not found
  res.json(register);
};

// Agregar nuevo registro
exports.agregarRegister = async (req, res) => {
  const {
    waste_date,
    responsible,
    dw_id,
    transporter_id,
    receptor_id,
    quantity,
    date_in,
    date_out
  } = req.body;
  try {
    if (!dw_id || !transporter_id || !receptor_id) {
      return res.status(400).json({ error: 'Faltan campos obligatorios: dw_id, transporter_id o receptor_id' });
    }
    const nuevoRegister = await registers.create({
      waste_date,
      responsible,
      dw_id,
      transporter_id,
      receptor_id,
      quantity,
      date_in,
      date_out
    });
    res.status(201).json({ register_id: nuevoRegister.register_id });
  } catch (error) {
    console.error('Error al crear el registro:', error);
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los campos de un registro por ID
exports.obtenerRegisterPorId = async (req, res) => {
  const { register_id } = req.params;
  if (!register_id) {
    return res.status(400).json({ error: 'Falta el parámetro register_id' });
  }
  try {
    const register = await registers.findOne({ where: { register_id } });
    if (!register) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }
    res.json(register); // Devuelve todos los campos del registro
  } catch (error) {
    console.error('Error al obtener el registro:', error);
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los registros dentro de un rango de fechas
exports.obtenerRegistersPorFecha = async (req, res) => {
  const { fecha_inicio, fecha_fin } = req.body;
  if (!fecha_inicio || !fecha_fin) {
    return res.status(400).json({ error: 'Faltan los campos fecha_inicio o fecha_fin' });
  }
  try {
    const registersByMonth = await registers.findAll({
      attributes: [
        [literal(`TO_CHAR(date_in, 'YYYY-MM')`), 'month'],
        [fn('SUM', col('quantity')), 'total_quantity']
      ],
      where: {
        date_in: {
          [Op.gte]: fecha_inicio,
          [Op.lte]: fecha_fin
        }
      },
      group: [literal('month')],
      order: [[literal('month'), 'ASC']]
    });
    res.json(registersByMonth);
  } catch (error) {
    console.error('Error al obtener los registros por fecha:', error);
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los registros
exports.obtenerTodosLosRegisters = async (req, res) => {
  try {
    const allRegisters = await registers.findAll();
    res.json(allRegisters);
  } catch (error) {
    console.error('Error al obtener todos los registros:', error);
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un registro por register_id (ahora recibe el id por params)
exports.actualizarRegister = async (req, res) => {
  const { register_id } = req.params;
  const camposActualizados = req.body;
  if (!register_id) {
    return res.status(400).json({ error: 'Falta el parámetro register_id' });
  }
  try {
    const register = await registers.findOne({ where: { register_id } });
    if (!register) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }
    // Solo actualiza los campos que vienen en el body
    Object.keys(camposActualizados).forEach(key => {
      if (camposActualizados[key] !== undefined) {
        register[key] = camposActualizados[key];
      }
    });
    await register.save();
    res.json({ mensaje: 'Registro actualizado correctamente', register });
  } catch (error) {
    console.error('Error al actualizar el registro:', error);
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un registro por register_id (id por params)
exports.eliminarRegister = async (req, res) => {
  const { register_id } = req.params;
  if (!register_id) {
    return res.status(400).json({ error: 'Falta el parámetro register_id' });
  }
  try {
    const deleted = await registers.destroy({ where: { register_id } });
    if (deleted === 0) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }
    res.json({ mensaje: 'Registro eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
    res.status(500).json({ error: error.message });
  }
};