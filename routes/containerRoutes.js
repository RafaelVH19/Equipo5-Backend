const express = require('express');
const router = express.Router();
const containerController = require('../controllers/containerController');

router.post('/container', containerController.agregarContainer);
router.post('/container/buscar', containerController.buscarContainerPorTipo);
router.get('/container/:container_id', containerController.obtenerNombreContainerPorId);

module.exports = router;