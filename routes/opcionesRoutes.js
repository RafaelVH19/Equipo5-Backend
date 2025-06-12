const express = require('express');
const router = express.Router();
const opcionesController = require('../controllers/opcionesController');

// Obtener todas las opciones
router.get('/opciones', opcionesController.obtenerTodasLasOpciones);

// Obtener todas las opciones por tipo
router.get('/opciones/tipo/:tipo', opcionesController.obtenerOpcionesPorTipo);

// Agregar una nueva opción
router.post('/opciones', opcionesController.agregarOpcion);

// Editar una opción por id
router.put('/opciones/:id', opcionesController.editarOpcion);

// Eliminar una opción por id
router.delete('/opciones/:id', opcionesController.eliminarOpcion);

module.exports = router;