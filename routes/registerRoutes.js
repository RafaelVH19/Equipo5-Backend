const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

router.post('/register', registerController.agregarRegister);
router.post('/register/buscar', registerController.buscarRegisterPorId);
router.get('/register/:register_id', registerController.obtenerRegisterPorId);
router.post('/register/por-fecha', registerController.obtenerRegistersPorFecha);
router.get('/register', registerController.obtenerTodosLosRegisters);
router.put('/register/actualizar/:register_id', registerController.actualizarRegister);
router.delete('/register/eliminar/:register_id', registerController.eliminarRegister);

module.exports = router;