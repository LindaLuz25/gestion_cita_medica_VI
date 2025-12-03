import React, { useEffect, useState } from 'react';
import {
    initUsuarios,
} from "../services/userService";
import "../css/Login.css";
import Logo from "../assets/Logo_EsSalud.png";
import { HorariosService } from "../services/HorarioService";

export const Login = () => {

    useEffect(() => {
        initUsuarios(); // Inicializa usuarios base
        localStorage.removeItem("usuarioActivo");

        // Inicializar médicos si no existen
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        if (!usuarios.some(u => u.rol === "medico")) {
            const medicos = [
                { dni: "11111111", nombre: "Dr. Juan Pérez", correo: "juan.perez@hospital.com", password: "1234", rol: "medico", especialidad: "Cardiología" },
                { dni: "22222222", nombre: "Dra. Ana Gómez", correo: "ana.gomez@hospital.com", password: "1234", rol: "medico", especialidad: "Pediatría" },
                { dni: "33333333", nombre: "Dr. Carlos Ruiz", correo: "carlos.ruiz@hospital.com", password: "1234", rol: "medico", especialidad: "Medicina General" },
            ];
            usuarios.push(...medicos);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            // Inicializar horarios para cada médico
            HorariosService.initHorarios("11111111", ["08:00", "09:00", "10:00", "11:00"]);
            HorariosService.initHorarios("22222222", ["09:00", "10:00", "11:00", "12:00"]);
            HorariosService.initHorarios("33333333", ["08:30", "09:30", "10:30", "11:30"]);
        }
    }, []);

    const [activeTab, setActiveTab] = useState("login");
    const [usuarios, setUsuarios] = useState(
        JSON.parse(localStorage.getItem("usuarios")) || []
    );

    // Estados login
    const [dniLogin, setDniLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");

    // Estados registro
    const [form, setForm] = useState({
        dni: "",
        nombre: "",
        celular: "",
        correo: "",
        password: "",
        rol: "paciente",
        sede: "",
        especialidad: "",
    });

    const [sedes] = useState([
        { id: 1, nombre: "Sede Central" },
        { id: 2, nombre: "Sede Sur" },
        { id: 3, nombre: "Sede Norte" },
    ]);

    const [especialidades] = useState([
        { id: 1, nombre: "Pediatría" },
        { id: 2, nombre: "Cardiología" },
        { id: 3, nombre: "Medicina General" },
    ]);

    // -----------------------------
    // REGISTRO
    // -----------------------------
    const handleRegister = (e) => {
        e.preventDefault();

        const dniRegex = /^\d{8}$/;
        const celularRegex = /^\d{9}$/;
        const correoRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

        if (!dniRegex.test(form.dni)) return alert("El DNI debe tener exactamente 8 dígitos.");
        if (!form.nombre.trim()) return alert("Debe ingresar su nombre.");
        if (!celularRegex.test(form.celular) && !correoRegex.test(form.correo))
            return alert("Debe ingresar un celular o correo válido.");
        if (!form.password.trim()) return alert("Debe ingresar una contraseña.");

        if (form.rol === "recepcionista") {
            if (!form.sede) return alert("Debe seleccionar una sede.");
            if (!form.especialidad) return alert("Debe seleccionar una especialidad.");
        }

        const dniExistente = usuarios.find((u) => u.dni === form.dni);
        if (dniExistente) return alert("Este DNI ya está registrado.");

        const nuevoUsuario = {
            ...form,
            rol: form.rol.toLowerCase(),
            sede: form.rol === "recepcionista" ? form.sede : "",
            especialidad: form.rol === "recepcionista" ? form.especialidad : "",
        };

        const nuevosUsuarios = [...usuarios, nuevoUsuario];
        setUsuarios(nuevosUsuarios);
        localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));

        alert("✅ Registro exitoso. Ahora puede iniciar sesión.");
        setForm({
            dni: "",
            nombre: "",
            celular: "",
            correo: "",
            password: "",
            rol: "paciente",
            sede: "",
            especialidad: "",
        });
        setActiveTab("login");
    };

    // -----------------------------
    // LOGIN
    // -----------------------------
    const handleLogin = (e) => {
        e.preventDefault();

        const usuario = usuarios.find(
            (u) => u.dni === dniLogin && u.password === passwordLogin
        );

        if (usuario) {
            localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
            alert(`Bienvenido ${usuario.nombre} (${usuario.rol})`);

            if (usuario.rol === "paciente") {
                window.location.href = "/paciente/inicio";
            } else if (usuario.rol === "recepcionista") {
                window.location.href = "/recepcionista/inicio";
            } else {
                window.location.href = "/principal";
            }
        } else {
            alert("DNI o contraseña incorrectos.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="text-center mb-3">
                    <img src={Logo} alt="Logo EsSalud" className="logo"></img>
                    <p className="text-muted">Sistema de Citas Médicas</p>
                </div>

                <ul className="nav nav-tabs justify-content-center mb-3">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === "login" ? "active" : ""}`}
                            onClick={() => setActiveTab("login")}
                        >
                            Iniciar Sesión
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === "register" ? "active" : ""}`}
                            onClick={() => setActiveTab("register")}
                        >
                            Registrarse
                        </button>
                    </li>
                </ul>

                {/* Contenido */}
                <div className="tab-content">
                    {/* LOGIN */}
                    {activeTab === "login" && (
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label className="form-label">DNI</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    maxLength="8"
                                    value={dniLogin}
                                    onChange={(e) => setDniLogin(e.target.value)}
                                    placeholder="Ingrese su DNI"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={passwordLogin}
                                    onChange={(e) => setPasswordLogin(e.target.value)}
                                    placeholder="********"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">
                                Ingresar
                            </button>
                        </form>
                    )}

                    {/* REGISTRO */}
                    {activeTab === "register" && (
                        <form onSubmit={handleRegister}>
                            <div className="mb-2">
                                <label className="form-label">DNI</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    maxLength="8"
                                    value={form.dni}
                                    onChange={(e) => setForm({ ...form, dni: e.target.value })}
                                    required
                                    placeholder="8 dígitos"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="form-label">Nombre completo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={form.nombre}
                                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                                    required
                                    placeholder="Ej. Juan Pérez"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="form-label">Celular</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    maxLength="9"
                                    value={form.celular}
                                    onChange={(e) => setForm({ ...form, celular: e.target.value })}
                                    placeholder="9 dígitos"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="form-label">Correo electrónico</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={form.correo}
                                    onChange={(e) => setForm({ ...form, correo: e.target.value })}
                                    placeholder="ejemplo@correo.com"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="form-label">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Rol</label>
                                <select
                                    className="form-select"
                                    value={form.rol}
                                    onChange={(e) =>
                                        setForm({ ...form, rol: e.target.value, sede: "", especialidad: "" })
                                    }
                                >
                                    <option value="paciente">Paciente</option>
                                    <option value="recepcionista">Recepcionista</option>
                                </select>
                            </div>

                            {form.rol === "recepcionista" && (
                                <>
                                    <div className="mb-3">
                                        <label className="form-label">Sede</label>
                                        <select
                                            className="form-select"
                                            value={form.sede}
                                            onChange={(e) =>
                                                setForm({ ...form, sede: e.target.value })
                                            }
                                        >
                                            <option value="">Seleccione una sede</option>
                                            {sedes.map((s) => (
                                                <option key={s.id} value={s.nombre}>
                                                    {s.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Especialidad</label>
                                        <select
                                            className="form-select"
                                            value={form.especialidad}
                                            onChange={(e) =>
                                                setForm({ ...form, especialidad: e.target.value })
                                            }
                                        >
                                            <option value="">Seleccione una especialidad</option>
                                            {especialidades.map((esp) => (
                                                <option key={esp.id} value={esp.nombre}>
                                                    {esp.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </>
                            )}

                            <button type="submit" className="btn btn-success w-100">
                                Registrarse
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
