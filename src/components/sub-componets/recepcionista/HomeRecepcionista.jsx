import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../css/HomeRecepcionista.css"

export const HomeRecepcionista = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (!usuario) {
    navigate("/");
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("usuarioActivo");
    alert("Sesión cerrada correctamente.");
    navigate("/");
  };

  return (
    <div className="homeRecep-container">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-gradient-primary px-4 shadow-sm">
        <a className="navbar-brand fw-bold text-white" href="#">
          🏥 EsSalud - Recepcionista
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarRecep"
          aria-controls="navbarRecep"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarRecep">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/recepcionista/inicio">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/recepcionista/inicio/calendario">
                Calendario de Citas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/recepcionista/inicio/gestionar-cita">
                Gestionar Citas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/panel-estadisticas">
                Estadísticas
              </Link>
            </li>

            <li className="nav-item ms-3">
              <button
                onClick={handleLogout}
                className="btn btn-outline-light btn-sm fw-semibold"
              >
                <i className="bi bi-box-arrow-right me-1"></i> Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero / Bienvenida */}
      <section className="hero-section">
        <div className="overlay"></div>
        <div className="hero-content text-center text-white">
          <h1 className="fw-bold mb-3">Bienvenida, {usuario.nombre} 👋</h1>
          <p className="lead">
            Rol: <strong>{usuario.rol}</strong> — Sede asignada:{" "}
            <strong>{usuario.sede || "Sin sede"}</strong>
          </p>
          <p className="mt-3">
            Desde este panel puedes gestionar citas médicas, revisar agendas de
            pacientes y coordinar horarios de los médicos de tu sede.
          </p>

          <div className="mt-4 d-flex justify-content-center gap-3">
            <Link to="/recepcionista/inicio/calendario" className="btn btn-light fw-semibold px-4">
              📅 Ver Calendario
            </Link>
            <Link
              to="/recepcionista/inicio/calendario"
              className="btn btn-outline-light fw-semibold px-4"
            >
              📋 Gestionar Citas
            </Link>
          </div>
        </div>
      </section>

      {/* Sección de info */}
      <div className="container text-center mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4 mb-4">
            <div className="info-card shadow-sm p-4 rounded-4 bg-white">
              <h5 className="text-primary fw-bold mb-2">📆 Citas del Día</h5>
              <p className="text-muted">
                Consulta rápidamente las citas programadas para hoy en tu sede.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="info-card shadow-sm p-4 rounded-4 bg-white">
              <h5 className="text-primary fw-bold mb-2">👩‍⚕️ Médicos Disponibles</h5>
              <p className="text-muted">
                Revisa qué médicos se encuentran activos y disponibles para atender.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="info-card shadow-sm p-4 rounded-4 bg-white">
              <h5 className="text-primary fw-bold mb-2">📁 Historial</h5>
              <p className="text-muted">
                Accede al historial de citas anteriores registradas por los pacientes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
