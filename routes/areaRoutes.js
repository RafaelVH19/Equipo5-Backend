const express = require('express');
const router = express.Router();
const areaController = require('../controllers/areaController');

router.post('/area', areaController.agregarArea);
router.post('/area/buscar', areaController.buscarAreaPorNombre);
router.get('/area/:area_id', areaController.obtenerNombreAreaPorId);

module.exports = router;