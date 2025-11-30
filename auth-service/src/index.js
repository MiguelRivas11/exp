// src/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middlewares
app.use(cors()); // Permite que el Frontend hable con el Backend
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

// Servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🔐 Auth Service corriendo en puerto ${PORT}`);
});