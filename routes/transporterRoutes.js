const express = require('express');
const router = express.Router();
const transporterController = require('../controllers/transporterController');

router.post('/transporter', transporterController.agregarTransporter);
router.post('/transporter/buscar', transporterController.buscarTransporterPorNombre);
router.get('/transporter/:transporter_id', transporterController.obtenerTransporterPorId);

module.exports = router;