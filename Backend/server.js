// Importar el módulo HTTP de Node.js
const http = require("node:http");

// Importar las funciones de contactos
const {
    validarContacto,
    guardarContacto
} = require("./contactos");

// Puerto del servidor
const PORT = 3000;

// Función para enviar respuestas JSON
function responder(res, estado, datos) {
    res.writeHead(estado, {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
    });

    res.end(JSON.stringify(datos));
}

// Crear servidor
const servidor = http.createServer((req, res) => {

    // Permitir solicitudes desde el frontend durante desarrollo
    if (req.method === "OPTIONS") {
        res.writeHead(204, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        });
        return res.end();
    }

    // Comprobar que el servidor funciona
    if (req.method === "GET" && req.url === "/api/health") {
        return responder(res, 200, {
            mensaje: "Backend de Ricky and Boxing funcionando."
        });
    }

    // Recibir solicitudes del formulario
    if (req.method === "POST" && req.url === "/api/contacto") {

        let cuerpo = "";
        let tamano = 0;
        const limite = 10 * 1024;

        req.on("data", (fragmento) => {
            tamano += fragmento.length;

            if (tamano > limite) {
                req.destroy();
                return;
            }

            cuerpo += fragmento;
        });

        req.on("end", () => {
            try {
                const datos = JSON.parse(cuerpo);

                const resultado = validarContacto(datos);

                // Si existen errores, responder con ellos
                if (!resultado.valido) {
                    return responder(res, 400, {
                        exitoso: false,
                        errores: resultado.errores
                    });
                }

                // Guardar solicitud
                const contactoGuardado = guardarContacto(resultado.datos);

                return responder(res, 201, {
                    exitoso: true,
                    mensaje: "Tu solicitud fue recibida correctamente.",
                    id: contactoGuardado.id
                });

            } catch (error) {
                return responder(res, 400, {
                    exitoso: false,
                    mensaje: "Los datos enviados no tienen un formato JSON válido."
                });
            }
        });

        return;
    }

    // Ruta no encontrada
    responder(res, 404, {
        mensaje: "La ruta solicitada no existe."
    });
});

// Iniciar servidor
servidor.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
