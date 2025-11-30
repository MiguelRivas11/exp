const Report = require('../models/Report');

// 1. CREAR REPORTE (POST)
exports.createReport = async (req, res) => {
    try {
        console.log("📨 Recibiendo nuevo reporte...");
        const { description, incidentType, latitude, longitude, address, image } = req.body;

        const newReport = new Report({
            descripcion: description,
            tipo_incidente: incidentType,
            ubicacion: {
                direccion: address,
                latitud: latitude,
                longitud: longitude
            },
            imagen: image,
            estado: 'pendiente'
        });

        const savedReport = await newReport.save();
        console.log(`✅ Reporte guardado con ID: ${savedReport._id}`);

        res.status(201).json({
            success: true,
            message: 'Reporte creado exitosamente',
            data: { reportId: savedReport._id }
        });
    } catch (error) {
        console.error("❌ Error creando reporte:", error);
        res.status(500).json({ success: false, message: 'Error al guardar', error: error.message });
    }
};

// 2. LISTAR TODOS LOS REPORTES (GET) - Sin imagen para rapidez
exports.getAllReports = async (req, res) => {
    try {
        const reports = await Report.find()
            .select('-imagen')
            .sort({ fecha_creacion: -1 });
        res.json({ success: true, data: reports });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error obteniendo reportes' });
    }
};

// 3. OBTENER REPORTES POR DEPENDENCIA (GET) <--- ¡ESTA ERA LA QUE FALTABA!
exports.getReportsByDependency = async (req, res) => {
    try {
        const { dependencyId } = req.params;
        const reports = await Report.find({ dependencia_asignada: dependencyId })
            .select('-imagen')
            .sort({ fecha_creacion: -1 });
        res.json({ success: true, data: reports });
    } catch (error) {
        console.error("Error filtrando reportes:", error);
        res.status(500).json({ success: false, message: 'Error al filtrar por dependencia' });
    }
};

// 4. OBTENER UN REPORTE POR ID (GET) - Con imagen
exports.getReportById = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) return res.status(404).json({ success: false, message: 'No encontrado' });
        res.json({ success: true, data: report });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error del servidor' });
    }
};

// 5. ACTUALIZAR REPORTE (PUT)
exports.updateReport = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedReport = await Report.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedReport) {
            return res.status(404).json({ success: false, message: 'Reporte no encontrado' });
        }
        res.json({ success: true, message: 'Reporte actualizado', data: updatedReport });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar' });
    }
};