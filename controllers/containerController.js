const containers = require('../models/containers');

// Buscar contenedor por tipo
exports.buscarContainerPorTipo = async (req, res) => {
  const { type } = req.body;
  if (!type) {
    return res.status(400).json({ error: 'Falta el campo type' });
  }
  const containerEncontrado = await containers.findOne({ where: { type } });
  if (!containerEncontrado) return res.json(0); // Return 0 if not found
  res.json({ container_id: containerEncontrado.container_id });
};

// Agregar nuevo contenedor
exports.agregarContainer = async (req, res) => {
  console.log('Request body:', req.body);
  const { container_id, type } = req.body;
  try {
    // Validar datos requeridos y reportar cuál falta
    if (!type) {
      return res.status(400).json({ error: 'Falta el campo type' });
    }
    // Crear contenedor
    const nuevoContainer = await containers.create({
      type
    });
    // Solo retornar el nuevo id
    res.status(201).json({ container_id: nuevoContainer.container_id });
  } catch (error) {
    console.error('Error al crear el contenedor:', error);
    res.status(500).json({ error: error.message });
  }
};

// Obtener nombre (tipo) de contenedor por ID
exports.obtenerNombreContainerPorId = async (req, res) => {
  const { container_id } = req.params;
  if (!container_id) {
    return res.status(400).json({ error: 'Falta el parámetro container_id' });
  }
  try {
    const containerEncontrado = await containers.findOne({ where: { container_id } });
    if (!containerEncontrado) {
      return res.status(404).json({ error: 'Contenedor no encontrado' });
    }
    res.json({ type: containerEncontrado.type });
  } catch (error) {
    console.error('Error al obtener el tipo del contenedor:', error);
    res.status(500).json({ error: error.message });
  }
};