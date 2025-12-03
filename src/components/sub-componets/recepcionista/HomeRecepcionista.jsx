import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/HomeRecepcionista.css";

export const HomeRecepcionista = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  const handleLogout = () => {
    localStorage.removeItem("usuarioActivo");
    navigate("/login");
  };

  return (
    <div className="homeRecep-container">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-gradient-primary px-4 shadow-sm">
        <span className="navbar-brand fw-bold text-white">🏥 EsSalud - Recepcionista</span>
        <div className="ms-auto">
          <button onClick={handleLogout} className="btn btn-outline-light btn-sm">
            Cerrar sesión
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-paciente">
        <div className="overlay"></div>
        <div className="hero-content text-center text-white">
          <h1 className="fw-bold mb-2">Bienvenida, {usuario?.nombre} 👋</h1>
          <p className="lead mb-3">
            Rol: <strong>{usuario?.rol}</strong> — Sede: <strong>{usuario?.sede || "Sin sede"}</strong>
          </p>
          <p>
            Administra las citas del día, revisa médicos disponibles y gestiona el historial desde tu panel digital.
          </p>
        </div>
      </section>

      {/* Cards */}
      <div className="container mt-5">
        <div className="row justify-content-center g-4">
          <div className="col-md-4">
            <div
              className="info-card shadow-sm p-4 rounded-4 bg-white h-100 clickable-card"
              onClick={() => navigate("/recepcionista/inicio/citas-del-dia")}
            >
              <h5 className="text-primary fw-bold mb-2">📆 Citas del Día</h5>
              <p className="text-muted">Haz clic para ver todas las citas programadas.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="info-card shadow-sm p-4 rounded-4 bg-white h-100 clickable-card"
              onClick={() => navigate("/recepcionista/inicio/medicos-disponibles")}
            >
              <h5 className="text-primary fw-bold mb-2">👩‍⚕️ Médicos Disponibles</h5>
              <p className="text-muted">Haz clic para ver horarios de los médicos.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="info-card shadow-sm p-4 rounded-4 bg-white h-100">
              <h5 className="text-primary fw-bold mb-2">📁 Historial</h5>
              <p className="text-muted">Accede al historial de citas anteriores.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};





