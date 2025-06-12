const transporters = require('../models/transporters');

// Buscar transportista por nombre
exports.buscarTransporterPorNombre = async (req, res) => {
  const { transporter_name } = req.body;
  if (!transporter_name) {
    return res.status(400).json({ error: 'Falta el campo transporter_name' });
  }
  const transporter = await transporters.findOne({ where: { transporter_name } });
  if (!transporter) return res.json(0); // Return 0 if not found
  res.json({ transporter_id: transporter.transporter_id });
};

// Agregar nuevo transportista
exports.agregarTransporter = async (req, res) => {
  console.log('Request body:', req.body);
  const { transporter_id, transporter_name, authorization_semarnat, authorization_sct, active } = req.body;
  try {
    // Validar datos requeridos y reportar cuál falta
    if (!transporter_name) {
      return res.status(400).json({ error: 'Falta el campo transporter_name' });
    }
    if (active === undefined) {
      return res.status(400).json({ error: 'Falta el campo active' });
    }
    // Crear transportista
    const nuevoTransporter = await transporters.create({
      transporter_name,
      authorization_semarnat,
      authorization_sct,
      active
    });
    // Solo retornar el nuevo id
    res.status(201).json({ transporter_id: nuevoTransporter.transporter_id });
  } catch (error) {
    console.error('Error al crear el transportista:', error);
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los campos de un transportista por ID
exports.obtenerTransporterPorId = async (req, res) => {
  const { transporter_id } = req.params;
  if (!transporter_id) {
    return res.status(400).json({ error: 'Falta el parámetro transporter_id' });
  }
  try {
    const transporter = await transporters.findOne({ where: { transporter_id } });
    if (!transporter) {
      return res.status(404).json({ error: 'Transportista no encontrado' });
    }
    res.json(transporter); // Devuelve todos los campos del transportista
  } catch (error) {
    console.error('Error al obtener el transportista:', error);
    res.status(500).json({ error: error.message });
  }
};