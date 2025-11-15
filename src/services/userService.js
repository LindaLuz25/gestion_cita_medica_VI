// userService.js

// Usuarios predefinidos
const usuariosBase = [
    {
        dni: "12345678",
        nombre: "Juan Pérez",
        celular: "987654321",
        correo: "juan@paciente.com",
        password: "123",
        rol: "paciente",
    },
    {
        dni: "87654321",
        nombre: "María López",
        celular: "912345678",
        correo: "maria@recepcion.com",
        password: "123",
        rol: "recepcionista",
        sede: "Sede Central",             // 👈 agregado
        especialidad: "Pediatría",        // 👈 agregado
    },
    {
        dni: "11223344",
        nombre: "Carlos Torres",
        celular: "999111222",
        correo: "carlos@admin.com",
        password: "123",
        rol: "administrador",
    },
];

// Si no hay usuarios en localStorage, los crea
export const initUsuarios = () => {
    if (!localStorage.getItem("usuarios")) {
        localStorage.setItem("usuarios", JSON.stringify(usuariosBase));
    }
};

// Obtener usuarios
export const getUsuarios = () => {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
};

// Agregar nuevo usuario (registro)
export const addUsuario = (nuevoUsuario) => {
    const usuarios = getUsuarios();
    usuarios.push(nuevoUsuario);
    console.log("🆕 Usuario registrado:", nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
};

// Iniciar sesión
export const loginUsuario = (dni, password) => {
    const usuarios = getUsuarios();
    const encontrado = usuarios.find(
        (u) => u.dni === dni && u.password === password
    );
    if (encontrado) console.log("✅ Usuario encontrado:", encontrado);
    else console.warn("⚠️ Usuario no encontrado");
    return encontrado;
};

// Guardar usuario activo
export const setUsuarioActivo = (usuario) => {
    console.log("👤 Usuario activo guardado:", usuario);
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
};

// Obtener usuario activo
export const getUsuarioActivo = () => {
    return JSON.parse(localStorage.getItem("usuarioActivo"));
};

// Cerrar sesión
export const logoutUsuario = () => {
    localStorage.removeItem("usuarioActivo");
};
