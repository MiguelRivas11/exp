const pool = require('../config/db');

// CREAR EXPEDIENTE DE DEPENDENCIA
exports.createDependencyProfile = async (req, res) => {
    const { userId, name, description, responsible, phone } = req.body;

    try {
        const query = `
            INSERT INTO dependencies (user_id, name, description, responsible, phone)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        const values = [userId, name, description, responsible, phone];
        
        const result = await pool.query(query, values);
        
        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error creando perfil:', error);
        res.status(500).json({ success: false, message: 'Error al guardar perfil' });
    }
};

// LISTAR TODAS LAS DEPENDENCIAS
exports.getAllDependencies = async (req, res) => {
    try {
        // Hacemos JOIN con la tabla de usuarios (que está en la misma BD física)
        // para traer el email también, aunque vivan en "servicios lógicos" distintos.
        const query = `
            SELECT d.*, u.email 
            FROM dependencies d
            JOIN users u ON d.user_id = u.id
            ORDER BY d.created_at DESC
        `;
        const result = await pool.query(query);
        
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error listando:', error);
        res.status(500).json({ success: false, message: 'Error al obtener lista' });
    }
};