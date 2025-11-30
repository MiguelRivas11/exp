// src/config/db.js
const { Pool } = require('pg');
require('dotenv').config();

// ☢️ LA SOLUCIÓN NUCLEAR (Solo para desarrollo) ☢️
// Esta línea desactiva la verificación estricta de SSL en todo el proceso.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

console.log("🔌 Intentando conectar a Aiven...");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Con la línea de arriba, ya no necesitamos configuración compleja aquí
    ssl: true 
});

pool.on('error', (err) => {
    console.error('❌ Error inesperado en el cliente de PG', err);
    process.exit(-1);
});

pool.connect()
    .then(client => {
        console.log('✅ ¡CONEXIÓN EXITOSA A AIVEN! ');
        client.release();
    })
    .catch(err => {
        console.error('❌ Error fatal:', err.message);
    });

module.exports = pool;