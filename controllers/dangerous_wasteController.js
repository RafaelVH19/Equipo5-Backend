const dangerous_wastes = require('../models/dangerous_wastes');

// Buscar residuo peligroso por nombre en español
exports.buscarDangerousWastePorNombre = async (req, res) => {
  const { name_spanish, article, container_id, area_id } = req.body;
  const waste = await dangerous_wastes.findOne({ where: { name_spanish, article, container_id, area_id } });
  if (!waste) return res.json(0); // Return 0 if not found
  res.json({ dw_id: waste.dw_id });
};

// Agregar nuevo residuo peligroso
exports.agregarDangerousWaste = async (req, res) => {
  // Puedes agregar más validaciones según tus necesidades
  const {
    name_spanish,
    name_english,
    article,
    container_id,
    area_id,
    field_c,
    field_r,
    field_e,
    field_t,
    field_te,
    field_th,
    field_tt,
    field_i,
    field_b,
    field_m,
  } = req.body;
  try {
    if (!name_spanish) {
      return res.status(400).json({ error: 'Falta el campo name_spanish' });
    }
    // Crear residuo peligroso
    const nuevoWaste = await dangerous_wastes.create({
      name_spanish,
      name_english,
      article,
      container_id,
      area_id,
      field_c,
      field_r,
      field_e,
      field_t,
      field_te,
      field_th,
      field_tt,
      field_i,
      field_b,
      field_m
    });
    res.status(201).json({ dw_id: nuevoWaste.dw_id });
  } catch (error) {
    console.error('Error al crear el residuo peligroso:', error);
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los campos de un residuo peligroso por ID
exports.obtenerDangerousWastePorId = async (req, res) => {
  const { dw_id } = req.params;
  if (!dw_id) {
    return res.status(400).json({ error: 'Falta el parámetro dw_id' });
  }
  try {
    const waste = await dangerous_wastes.findOne({ where: { dw_id } });
    if (!waste) {
      return res.status(404).json({ error: 'Residuo peligroso no encontrado' });
    }
    res.json(waste); // Devuelve todos los campos del residuo peligroso
  } catch (error) {
    console.error('Error al obtener el residuo peligroso:', error);
    res.status(500).json({ error: error.message });
  }
};