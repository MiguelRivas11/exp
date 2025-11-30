const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

console.log("Funciones del controlador", reportController);

// Rutas existentes...
router.post('/', reportController.createReport);
router.get('/', reportController.getAllReports);
router.get('/by-dependency/:dependencyId', reportController.getReportsByDependency);

// --- AGREGA ESTA LÍNEA (Es la que te falta) ---
// GET /api/reports/123 -> Ver detalle de un reporte
router.get('/:id', reportController.getReportById);
router.put('/:id', reportController.updateReport);

module.exports = router;