const express = require('express');
const router = express.Router();
const dangerousWasteController = require('../controllers/dangerous_wasteController');

router.post('/dangerous_waste', dangerousWasteController.agregarDangerousWaste);
router.post('/dangerous_waste/buscar', dangerousWasteController.buscarDangerousWastePorNombre);
router.get('/dangerous_waste/:dw_id', dangerousWasteController.obtenerDangerousWastePorId);

module.exports = router;