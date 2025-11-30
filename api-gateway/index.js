// api-gateway/index.js
const express = require('express');
const proxy = require('express-http-proxy');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // Para poder leer JSON bodies si hiciera falta

console.log("🚦 Iniciando CityCare API Gateway...");

// --- RUTAS DE MICROSERVICIOS (Redirección de Tráfico) ---

// 1. Tráfico de Autenticación -> Puerto 3001
app.use('/api/auth', proxy('http://localhost:3001', {
    proxyReqPathResolver: (req) => {
        // Mantiene la ruta original: /api/auth/login -> /api/auth/login
        return `/api/auth${req.url}`;
    }
}));

// 2. Tráfico de Reportes -> Puerto 3002
app.use('/api/reports', proxy('http://localhost:3002', {
    proxyReqPathResolver: (req) => {
        return `/api/reports${req.url}`;
    }
}));
// ... otras redirecciones ...

// 3. Tráfico de Dependencias -> Puerto 3003 (NUEVO)
app.use('/api/dependencies', proxy('http://localhost:3003', {
    proxyReqPathResolver: (req) => {
        return `/api/dependencies${req.url}`;
    }
}));


// --- SERVIR EL FRONTEND (Opcional pero recomendado) ---
// Esto hace que http://localhost:3000 cargue tu página web

// Servir archivos estáticos (CSS, JS, Imágenes)
app.use(express.static(path.join(__dirname, '../frontend')));

// Ruta Raíz -> Manda al Ciudadano (Public)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

// Ruta Admin -> Manda al Login
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/admin/login.html'));
});

// --- ARRANCAR ---
app.listen(PORT, () => {
    console.log(`🚀 Gateway corriendo en: http://localhost:${PORT}`);
    console.log(`   👉 Ciudadanos: http://localhost:${PORT}`);
    console.log(`   👉 Admin:      http://localhost:${PORT}/admin`);
});