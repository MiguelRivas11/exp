// src/controllers/authController.js
const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    // 1. Recibimos la variable 'rememberMe' del frontend
    const { email, password, rememberMe } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
        }
        const user = result.rows[0];

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
        }

        // 2. LÓGICA DE SEGURIDAD (Duración del Token)
        // Si activó "Recordar": 7 días ('7d')
        // Si NO activó: 12 horas ('12h') - O menos si prefieres mayor seguridad
        const tokenDuration = rememberMe ? '7d' : '12h';

        const token = jwt.sign(
            { id: user.id, role: user.role, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: tokenDuration } // <--- Usamos la variable aquí
        );

        const redirectUrl = user.role === 'admin' ? '/admin/admin-dashboard.html' : '/admin/dependencia-dashboard.html';

        res.json({
            success: true,
            message: 'Bienvenido a CityCare',
            token: token,
            redirect: redirectUrl,
            user: { id: user.id, name: user.name, role: user.role }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
};

exports.register = async (req, res) => {
    // Este endpoint es temporal para que puedas crear tu primer Admin
    const { name, email, password, role } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await pool.query(
            'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, email',
            [name, email, hashedPassword, role]
        );
        res.json({ success: true, user: result.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};