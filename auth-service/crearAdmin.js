// Sin require, Node v22 ya sabe qué es fetch

async function crearAdmin() {
    console.log("⏳ Creando Administrador...");

    try {
        const response = await fetch('http://localhost:3001/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: "Admin General",
                email: "admin@citycare.com",
                password: "admin123", 
                role: "admin"
            })
        });

        const data = await response.json();
        console.log("Respuesta del servidor:", data);
    } catch (error) {
        console.error("❌ Error conectando al servidor:", error.message);
        console.log("Asegúrate de que 'node src/index.js' esté corriendo en otra terminal.");
    }
}

crearAdmin();