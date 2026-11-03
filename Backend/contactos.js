
// Lista temporal de contactos recibidos
const contactos = [];

// Disciplinas permitidas
const disciplinasPermitidas = ["Boxeo", "MMA", "Fitness"];

// Validar los datos del formulario
function validarContacto(datos) {
    const errores = [];

    const nombre = typeof datos.nombre === "string"
        ? datos.nombre.trim()
        : "";

    const contacto = typeof datos.contacto === "string"
        ? datos.contacto.trim()
        : "";

    const disciplina = typeof datos.disciplina === "string"
        ? datos.disciplina.trim()
        : "";

    const mensaje = typeof datos.mensaje === "string"
        ? datos.mensaje.trim()
        : "";

    // Validar nombre
    if (nombre.length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres.");
    }

    // Validar correo o teléfono
    const esCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contacto);

    const telefonoLimpio = contacto.replace(/[\s()+-]/g, "");
    const esTelefono = /^\d{10,15}$/.test(telefonoLimpio);

    if (!esCorreo && !esTelefono) {
        errores.push("Ingresa un correo electrónico o teléfono válido.");
    }

    // Validar disciplina
    if (!disciplinasPermitidas.includes(disciplina)) {
        errores.push("Selecciona Boxeo, MMA o Fitness.");
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
            contacto,
            disciplina,
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
