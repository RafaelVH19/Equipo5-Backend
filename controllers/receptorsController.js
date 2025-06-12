const receptors = require('../models/receptors');

// Buscar receptor por nombre
exports.buscarReceptorPorNombre = async (req, res) => {
  const { name_reason } = req.body;
  if (!name_reason) {
    return res.status(400).json({ error: 'Falta el campo name_reason' });
  }
  const receptor = await receptors.findOne({ where: { name_reason } });
  if (!receptor) return res.json(0); // Return 0 if not found
  res.json({ receptor_id: receptor.receptor_id });
};

// Agregar nuevo receptor
exports.agregarReceptor = async (req, res) => {
  console.log('Request body:', req.body);
  const { receptor_id, name_reason, auth, active } = req.body;
  try {
    // Validar datos requeridos y reportar cuál falta
    if (!name_reason) {
      return res.status(400).json({ error: 'Falta el campo name_reason' });
    }
    if (active === undefined) {
      return res.status(400).json({ error: 'Falta el campo active' });
    }
    // Crear receptor
    const nuevoReceptor = await receptors.create({
      name_reason,
      auth,
      active
    });
    // Solo retornar el nuevo id
    res.status(201).json({ receptor_id: nuevoReceptor.receptor_id });
  } catch (error) {
    console.error('Error al crear el receptor:', error);
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los campos de un receptor por ID
exports.obtenerReceptorPorId = async (req, res) => {
  const { receptor_id } = req.params;
  if (!receptor_id) {
    return res.status(400).json({ error: 'Falta el parámetro receptor_id' });
  }
  try {
    const receptor = await receptors.findOne({ where: { receptor_id } });
    if (!receptor) {
      return res.status(404).json({ error: 'Receptor no encontrado' });
    }
    res.json(receptor); // Devuelve todos los campos del receptor
  } catch (error) {
    console.error('Error al obtener el receptor:', error);
    res.status(500).json({ error: error.message });
  }
};