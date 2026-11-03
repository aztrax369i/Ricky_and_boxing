// Lista temporal de contactos recibidos
const contactos = [];

// Validar los datos del formulario
function validarContacto(datos) {
    const errores = [];

    // Obtener y limpiar los datos
    const nombre = typeof datos.nombre === "string"
        ? datos.nombre.trim()
        : "";

    const correo = typeof datos.correo === "string"
        ? datos.correo.trim()
        : "";

    const telefono = typeof datos.telefono === "string"
        ? datos.telefono.trim()
        : "";

    const asunto = typeof datos.asunto === "string"
        ? datos.asunto.trim()
        : "";

    const mensaje = typeof datos.mensaje === "string"
        ? datos.mensaje.trim()
        : "";

    // Validar nombre
    if (nombre.length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres.");
    }

    // Validar correo electrónico
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

    if (!correoValido) {
        errores.push("Ingresa un correo electrónico válido.");
    }

    // Validar teléfono
    const telefonoLimpio = telefono.replace(/[\s()+-]/g, "");

    if (!/^\d{10,15}$/.test(telefonoLimpio)) {
        errores.push("Ingresa un teléfono válido de 10 a 15 dígitos.");
    }

    // Validar asunto
    const asuntosPermitidos = [
        "recreativo",
        "hiit",
        "competitivo",
        "personalizado"
    ];

    if (!asuntosPermitidos.includes(asunto)) {
        errores.push("Selecciona un asunto válido.");
    }

    // Validar mensaje
    if (mensaje.length < 5) {
        errores.push("El mensaje debe tener al menos 5 caracteres.");
    }

    return {
        valido: errores.length === 0,
        errores,
        datos: {
            nombre,
            correo,
            telefono,
            asunto,
            mensaje
        }
    };
}

// Guardar contacto temporalmente
function guardarContacto(datos) {
    const nuevoContacto = {
        id: contactos.length + 1,
        ...datos,
        fecha: new Date().toISOString()
    };

    contactos.push(nuevoContacto);

    return nuevoContacto;
}

module.exports = {
    validarContacto,
    guardarContacto
};