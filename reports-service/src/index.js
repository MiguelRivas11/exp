// reports-service/src/index.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Importa tu conexión a Mongo
const reportRoutes = require('./routes/reportRoutes'); // Importa tus rutas
require('dotenv').config();

const app = express();

// 1. Conectar a Base de Datos
connectDB();

// 2. Configuración (Middlewares)
app.use(cors()); // Permite que el HTML hable con el servidor
app.use(express.json({ limit: '10mb' })); // Permite subir fotos pesadas en Base64

// 3. Rutas
// Todo lo que llegue a "/api/reports" se manda al archivo de rutas
app.use('/api/reports', reportRoutes);

app.get('/', (req, res) => {
    res.send('API de Reportes CityCare funcionando 📝');
});

// 4. Arrancar servidor
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`📝 Reports Service corriendo en puerto ${PORT}`);
});