const areas = require('../models/areas');

// Buscar área por nombre
exports.buscarAreaPorNombre = async (req, res) => {
  const { area } = req.body;
  if (!area) {
    return res.status(400).json({ error: 'Falta el campo area' });
  }
  const areaEncontrada = await areas.findOne({ where: { area } });
  if (!areaEncontrada) return res.json(0); // Return 0 if not found
  res.json({ area_id: areaEncontrada.area_id });
};

// Agregar nueva área
exports.agregarArea = async (req, res) => {
  console.log('Request body:', req.body);
  const { area_id, area } = req.body;
  try {
    // Validar datos requeridos y reportar cuál falta
    if (!area) {
      return res.status(400).json({ error: 'Falta el campo area' });
    }
    // Crear área
    const nuevaArea = await areas.create({
      area
    });
    // Solo retornar el nuevo id
    res.status(201).json({ area_id: nuevaArea.area_id });
  } catch (error) {
    console.error('Error al crear el área:', error);
    res.status(500).json({ error: error.message });
  }
};

// Obtener nombre de área por ID
exports.obtenerNombreAreaPorId = async (req, res) => {
  const { area_id } = req.params;
  if (!area_id) {
    return res.status(400).json({ error: 'Falta el parámetro area_id' });
  }
  try {
    const areaEncontrada = await areas.findOne({ where: { area_id } });
    if (!areaEncontrada) {
      return res.status(404).json({ error: 'Área no encontrada' });
    }
    res.json({ area: areaEncontrada.area });
  } catch (error) {
    console.error('Error al obtener el nombre del área:', error);
    res.status(500).json({ error: error.message });
  }
};