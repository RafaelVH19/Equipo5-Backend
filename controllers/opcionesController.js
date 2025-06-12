const opciones = require('../models/opciones');

// Obtener todas las opciones
exports.obtenerTodasLasOpciones = async (req, res) => {
  try {
    const allOpciones = await opciones.findAll();
    res.json(allOpciones);
  } catch (error) {
    console.error('Error al obtener las opciones:', error);
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las opciones por tipo
exports.obtenerOpcionesPorTipo = async (req, res) => {
  const { tipo } = req.params;
  if (!tipo) {
    return res.status(400).json({ error: 'Falta el parámetro tipo' });
  }
  try {
    const opcionesPorTipo = await opciones.findAll({ where: { tipo } });
    res.json(opcionesPorTipo);
  } catch (error) {
    console.error('Error al obtener las opciones por tipo:', error);
    res.status(500).json({ error: error.message });
  }
};

// Agregar una nueva opción
exports.agregarOpcion = async (req, res) => {
  const { tipo, valor, orden } = req.body;
  if (!valor) {
    return res.status(400).json({ error: 'El campo valor es obligatorio' });
  }
  try {
    const nuevaOpcion = await opciones.create({ tipo, valor, orden });
    res.status(201).json({ id: nuevaOpcion.id });
  } catch (error) {
    console.error('Error al agregar la opción:', error);
    res.status(500).json({ error: error.message });
  }
};

// Editar una opción por id
exports.editarOpcion = async (req, res) => {
  const { id } = req.params;
  const camposActualizados = req.body;
  if (!id) {
    return res.status(400).json({ error: 'Falta el parámetro id' });
  }
  try {
    const opcion = await opciones.findOne({ where: { id } });
    if (!opcion) {
      return res.status(404).json({ error: 'Opción no encontrada' });
    }
    Object.keys(camposActualizados).forEach(key => {
      if (camposActualizados[key] !== undefined) {
        opcion[key] = camposActualizados[key];
      }
    });
    await opcion.save();
    res.json({ mensaje: 'Opción actualizada correctamente', opcion });
  } catch (error) {
    console.error('Error al editar la opción:', error);
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una opción por id
exports.eliminarOpcion = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'Falta el parámetro id' });
  }
  try {
    const deleted = await opciones.destroy({ where: { id } });
    if (deleted === 0) {
      return res.status(404).json({ error: 'Opción no encontrada' });
    }
    res.json({ mensaje: 'Opción eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la opción:', error);
    res.status(500).json({ error: error.message });
  }
};