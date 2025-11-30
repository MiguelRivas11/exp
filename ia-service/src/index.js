// ai-service/src/index.js
const express = require('express');
const cors = require('cors');
const classifier = require('./utils/classifier'); // Importamos el cerebro ya entrenado

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint para predecir
app.post('/api/ai/predict', (req, res) => {
    const { text } = req.body;

    if (!text) return res.status(400).json({ error: 'Falta el texto' });

    // 1. La IA clasifica el texto
    const category = classifier.classify(text);
    
    // 2. Obtenemos también la confianza (¿Qué tan seguro está?)
    // getClassifications devuelve un array con porcentajes
    const classifications = classifier.getClassifications(text);
    const bestGuess = classifications[0]; // La opción con más puntaje

    res.json({
        success: true,
        category: category,
        confidence: bestGuess.value, // Valor numérico de confianza
        all_scores: classifications // Por si quieres ver las otras opciones
    });
});

const PORT = 3004;
app.listen(PORT, () => {
    console.log(`🤖 AI Service corriendo en puerto ${PORT}`);
});