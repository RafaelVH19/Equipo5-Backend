const logs = require('../models/logs');

// Función utilitaria para agregar log
async function agregarLog({ username = null, log_action, register_id = null }) {
  try {
    const nuevoLog = await logs.create({
      username,
      log_action,
      register_id
    });
    return nuevoLog;
  } catch (error) {
    console.error('Error al agregar log:', error);
    throw error;
  }
}

// Controlador para la ruta POST /log
exports.agregarLog = async (req, res) => {
  const { username = null, log_action, register_id = null } = req.body;
  if (!log_action) {
    return res.status(400).json({ error: 'Falta el campo log_action' });
  }
  try {
    const nuevoLog = await agregarLog({ username, log_action, register_id });
    res.status(201).json(nuevoLog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Exporta la función utilitaria si la necesitas en otros controladores
exports.agregarLogUtil = agregarLog;