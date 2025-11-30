const { Pool } = require('pg');
require('dotenv').config();

// Configuración SSL para Aiven
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

pool.on('error', (err) => {
    console.error('❌ Error en Dependency DB:', err);
});

pool.connect()
    .then(client => {
        console.log('✅ Conectado a Aiven (Dependency Service)');
        client.release();
    })
    .catch(err => console.error('❌ Error conexión:', err.message));

module.exports = pool;