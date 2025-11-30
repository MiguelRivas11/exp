const express = require('express');
const cors = require('cors');
require('dotenv').config();
const dependencyRoutes = require('./routes/dependencyRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/dependencies', dependencyRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`🏢 Dependency Service corriendo en puerto ${PORT}`);
});