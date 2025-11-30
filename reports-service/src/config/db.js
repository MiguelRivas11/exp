// reports-service/src/config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        // Conexión a MongoDB (usando la variable del .env)
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Conectado a MongoDB (Reportes)');
    } catch (error) {
        console.error('❌ Error conectando a MongoDB:', error.message);
        process.exit(1); // Detener la app si falla la DB
    }
};

module.exports = connectDB;