const express = require('express');
const router = express.Router();
const receptorsController = require('../controllers/receptorsController');

router.post('/receptor', receptorsController.agregarReceptor);
router.post('/receptor/buscar', receptorsController.buscarReceptorPorNombre);
router.get('/receptor/:receptor_id', receptorsController.obtenerReceptorPorId);

module.exports = router;