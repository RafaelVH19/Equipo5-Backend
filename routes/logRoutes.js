const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');

router.post('/logs', logController.agregarLog);

module.exports = router;