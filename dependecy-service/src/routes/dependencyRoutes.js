const express = require('express');
const router = express.Router();
const dependencyController = require('../controllers/dependencyController');

// POST /api/dependencies -> Crear perfil
router.post('/', dependencyController.createDependencyProfile);

// GET /api/dependencies -> Listar todas
router.get('/', dependencyController.getAllDependencies);

module.exports = router;