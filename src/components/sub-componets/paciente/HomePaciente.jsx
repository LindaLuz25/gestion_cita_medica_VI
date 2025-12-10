import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import img1 from "../../../assets/img1.jpg";
import img2 from "../../../assets/img2.jpg";
import img3 from "../../../assets/img3.jpg";
import "../../../css/HomePaciente.css"
import { FooterPage } from "../../FooterPage";



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
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4 mb-15">
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
                                ✍🏻️ Registrar Cita
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/paciente/inicio/mis-citas" className="nav-link">
                                📅 Ver Mis Citas
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/nosotros" className="nav-link">
                                👥 Nosotros
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
            <div className="prep-cita-banner">
                <Link to="/paciente/inicio/preparacion-cita" className="prep-cita-btn">
                    ⚕️ Prepárate para tu Cita
                </Link>
            </div>


            <div id="heroCarousel" className="carousel slide hero-carousel" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {/* Slide 1 */}
                    <div className="carousel-item active">
                        <img src="https://images.pexels.com/photos/6129681/pexels-photo-6129681.jpeg" className="d-block w-100 hero-img" />
                        <div className="carousel-caption hero-caption">
                            <h1 className="fw-bold">Bienvenido, {usuario.nombre} 💙</h1>
                            <p>Gestiona tus citas médicas de forma rápida y fácil.</p>
                        </div>
                    </div>
                    {/* Slide 2 */}
                    <div className="carousel-item">
                        <img src="https://images.pexels.com/photos/8442151/pexels-photo-8442151.jpeg" className="d-block w-100 hero-img" />
                        <div className="carousel-caption hero-caption">
                            <h1 className="fw-bold">Cuidado de calidad</h1>
                            <p>Tu salud es nuestra prioridad.</p>
                        </div>
                    </div>

                    {/* Slide 3 */}
                    <div className="carousel-item">
                        <img src="https://images.pexels.com/photos/6129192/pexels-photo-6129192.jpeg" className="d-block w-100 hero-img" />
                        <div className="carousel-caption hero-caption">
                            <h1 className="fw-bold">Servicios modernos</h1>
                            <p>Atención médica especializada para ti.</p>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon"></span>
                </button>
            </div>

            {/* Hero Section */}
            <section className="hero-tira">
                <div className="tira-container">

                    <Link to="/paciente/inicio/registrar-cita" className="btn-tira btn-left">
                        🩺 Registrar Cita
                    </Link>

                    <div className="tira-info">
                        <p className="tira-text">
                            Gestiona tus citas, consulta tu historial y mantén tus datos actualizados.
                        </p>
                    </div>

                    <Link to="/paciente/inicio/historial" className="btn-tira btn-right">
                        📄 Ver Historial
                    </Link>

                </div>
            </section>

            {/* Sección sobre el hospital */}
            <section className="hospital-info-section">
                <div className="hospital-info-container">
                    <div className="hospital-info-text">
                        <h2 className="info-title">Sobre EsSalud</h2>
                        <p className="info-description">
                            En EsSalud brindamos atención médica integral con tecnología moderna,
                            especialistas altamente capacitados y un compromiso constante con el
                            bienestar de nuestros pacientes.
                        </p>

                        <Link to="/nosotros" className="btn-info-mas">
                            Conocer más sobre nosotros →
                        </Link>
                    </div>

                    <div className="hospital-info-img">
                        <img
                            src="https://images.pexels.com/photos/8460348/pexels-photo-8460348.jpeg"
                            alt="Hospital EsSalud"
                        />
                    </div>
                </div>
            </section>

            <section className="doctores-header">
                <h2 className="doctores-title">👨‍⚕️ Nuestros Mejores Especialistas</h2>
                <p className="doctores-subtitle">
                    Conoce a los profesionales altamente capacitados que estarán a tu disposición.
                </p></section>
            <div className="container-doctors">
                <div className="card__container">
                    <article className="card__article">
                        <img src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg" alt="image" className="card__img"></img>

                        <div className="card__data">
                            <span className="card__description">Especialista en Medicina General</span>
                            <h2 className="card__title">Dra. María Fernández</h2>
                            <Link to="/doctora/maria" className="card__button">Ver Perfil</Link>
                        </div>
                    </article>

                    <article className="card__article">
                        <img src="https://images.pexels.com/photos/32160037/pexels-photo-32160037.jpeg" alt="image" className="card__img"></img>

                        <div className="card__data">
                            <span className="card__description">Especialista en Pediatría</span>
                            <h2 className="card__title">Dr. Luis Ramos</h2>
                            <Link to="/doctor/luis" className="card__button">Ver Perfil</Link>
                        </div>
                    </article>

                    <article className="card__article">
                        <img src="https://images.pexels.com/photos/15960478/pexels-photo-15960478.jpeg" alt="image" className="card__img"></img>

                        <div className="card__data">
                            <span className="card__description">Especialista en Cardiología</span>
                            <h2 className="card__title">Dr. Javier Alarcón</h2>
                            <Link to="/doctor/javier" className="card__button">Ver Perfil</Link>
                        </div>
                    </article>
                </div>
            </div>
            <FooterPage />

        </div>
    );
};