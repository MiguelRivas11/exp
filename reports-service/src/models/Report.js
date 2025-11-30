// reports-service/src/models/Report.js
const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    tipo_incidente: {
        type: String,
        required: true, // Ej: 'Bache', 'Alumbrado'
    },
    ubicacion: {
        direccion: String,
        latitud: { type: String, required: true },
        longitud: { type: String, required: true }
    },
    imagen: {
        type: String, // Guardaremos la imagen en Base64
        default: null
    },
    estado: {
        type: String,
        enum: ['pendiente', 'en_proceso', 'resuelto', 'cancelado'],
        default: 'pendiente'
    },
    dependencia_asignada: {
        type: String,
        default: null
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Report', ReportSchema);