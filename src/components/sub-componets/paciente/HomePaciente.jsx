import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import img1 from "../../../assets/img1.jpg";
import img2 from "../../../assets/img2.jpg";
import img3 from "../../../assets/img3.jpg";
import "../../../css/HomePaciente.css"


export const HomePaciente = () => {
    const navigate = useNavigate();
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (!usuario) {
        navigate("/");
        return null;
    }

    // 🧹 Función para cerrar sesión
    const handleLogout = () => {
        localStorage.removeItem("usuarioActivo");
        alert("Sesión cerrada correctamente.");
        navigate("/"); // redirige al login
    };

    return (
        <div className="homePaciente-container">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4">
                <a className="navbar-brand fw-bold text-primary" href="#">
                    🏥 EsSalud - Paciente
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarPaciente"
                    aria-controls="navbarPaciente"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarPaciente">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item">
                            <Link className="nav-link" to="/paciente/inicio">
                                Inicio
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/paciente/inicio/registrar-cita">
                                Registrar Cita
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/paciente/inicio/mis-citas" className="nav-link">
                                📅 Ver Mis Citas
                            </Link>
                        </li>


                        <li className="nav-item ms-3">
                            <button
                                onClick={handleLogout}
                                className="btn btn-outline-danger btn-sm fw-semibold"
                            >
                                <i className="bi bi-box-arrow-right me-1"></i> Cerrar sesión
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-paciente">
                <div className="overlay"></div>
                <div className="hero-content text-center text-white">
                    <h1 className="fw-bold mb-2">Bienvenido, {usuario.nombre} 💙</h1>
                    <p className="lead mb-3">
                        Rol: <strong>{usuario.rol}</strong>
                    </p>
                    <p>
                        Gestiona tus citas médicas, revisa tu historial y mantén tus datos
                        siempre actualizados desde este panel digital.
                    </p>

                    <div className="mt-4 d-flex justify-content-center gap-3">
                        <Link
                            to="/paciente/inicio/registrar-cita"
                            className="btn btn-light fw-semibold px-4"
                        >
                            🩺 Registrar Cita
                        </Link>
                        <Link
                            to="/paciente/inicio/historial"
                            className="btn btn-outline-light fw-semibold px-4"
                        >
                            📄 Ver Historial
                        </Link>

                    </div>
                </div>
            </section>

            {/* Cards Section */}
            <div className="container my-5">
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="paciente-card shadow-sm border-0 h-100 text-center">
                            <img src={img1} className="card-img-top" alt="Cita médica" />
                            <div className="card-body p-3">
                                <h5 className="fw-bold text-primary">Reprograma tu Cita</h5>
                                <p className="text-muted">
                                    Si no podrás asistir a tu cita, gestionarla aquí, te ayudará a evitar inconvenientes
                                </p>
                                <Link
                                    to="/paciente/inicio/mis-citas"
                                    className="btn btn-primary w-100"
                                >
                                    Reprogramar
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="paciente-card shadow-sm border-0 h-100 text-center">
                            <img src={"https://images.pexels.com/photos/5327584/pexels-photo-5327584.jpeg"} className="card-img-top" alt="Cita médica" />
                            <div className="card-body p-3">
                                <h5 className="fw-bold text-primary">Prepárate para tu Cita</h5>
                                <p className="text-muted">
                                    Conoce qué documentos o indicaciones necesitas antes de asistir a tu consulta médica.
                                </p>
                                <Link
                                    to="/paciente/inicio/mis-citas"
                                    className="btn btn-primary w-100 mt-3"
                                >
                                    Más
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="paciente-card shadow-sm border-0 h-100 text-center">
                            <img src={"https://images.pexels.com/photos/5244065/pexels-photo-5244065.jpeg"} className="card-img-top" alt="Cita médica" />
                            <div className="card-body p-3">
                                <h5 className="fw-bold text-primary">Gestiona tus Citas</h5>
                                <p className="text-muted">
                                    Revisa tus citas pendientes, confirmadas o reprogramadas en un solo lugar.
                                </p>
                                <Link
                                    to="/paciente/inicio/mis-citas"
                                    className="btn btn-primary w-100 mt-3"
                                >
                                    Más
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};