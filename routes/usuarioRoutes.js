const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/usuarios', usuarioController.obtenerUsuarios);
router.get('/usuarios/:id', usuarioController.obtenerUsuario);
router.put('/usuarios/:id', usuarioController.actualizarUsuario);
router.delete('/usuarios/:id', usuarioController.eliminarUsuario);
router.get('/usuarios/:id/admin', usuarioController.obtenerEstadoAdmin);

module.exports = router;
