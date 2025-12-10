import { Link, useNavigate } from "react-router-dom";
import "../../../css/HomeRecepcionista.css"
import React, { useEffect, useState } from "react";
import { EstadisticasService } from "../../../services/EstadisticasService";
import { FooterPage } from "../../FooterPage";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card } from "react-bootstrap";

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

  const noticias = [
    "El Dr. Ramírez llegará 20 minutos tarde hoy.",
    "La sala 3 estará en mantenimiento de 3:00 pm a 4:00 pm.",
    "Recordatorio: Actualizar la asistencia de los pacientes diariamente."
  ];

  const medicos = [
    { nombre: "Dr. Javier Alarcón", disponible: true },
    { nombre: "Dra. Sofía Rivas", disponible: false },
    { nombre: "Dr. Luis Fernández", disponible: true },
  ];

  const [citasDia, setCitasDia] = useState([]);
  const [ocupacion, setOcupacion] = useState(0);
  const [topEspecialidades, setTopEspecialidades] = useState([]);


  useEffect(() => {
    const citasPorDiaObj = EstadisticasService.citasPorDia();
    const citasDiaArr = Object.entries(citasPorDiaObj).map(([fecha, total]) => ({
      fecha,
      total,
    }));

    setCitasDia(citasDiaArr);
    setOcupacion(EstadisticasService.porcentajeOcupacion());
    setTopEspecialidades(EstadisticasService.topEspecialidades());
  }, []);

  return (
    <div className="homeRecep-container">

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-gradient-primary px-4 shadow-sm fixed-top custom-navbar">
        <a className="navbar-brand fw-bold text-white" href="#">
          🏥 EsSalud - Recepcionista
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarRecep"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarRecep">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/recepcionista/inicio">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/recepcionista/inicio/calendario">📅Calendario de Citas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/recepcionista/inicio/gestionar-cita">✍🏻Gestionar Citas</Link>
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

      {/* Hero */}
      <section className="hero-section">
        <div className="overlay"></div>
        <div className="hero-content text-center text-white">
          <h1 className="fw-bold mb-3">Bienvenida, {usuario.nombre} 👋</h1>

          <p className="lead">
            Rol: <strong>{usuario.rol}</strong> — Sede:{" "}
            <strong>{usuario.sede || "Sin sede"}</strong>
          </p>

          <p className="mt-3">
            Desde este panel puedes gestionar citas, revisar agendas y coordinar
            horarios de los médicos.
          </p>

          <div className="mt-4 d-flex justify-content-center gap-3">
            <Link to="/recepcionista/inicio/calendario" className="btn btn-light fw-semibold px-4">
              📅 Ver Calendario
            </Link>
            <Link to="/recepcionista/inicio/gestionar-cita" className="btn btn-outline-light fw-semibold px-4">
              📋 Gestionar Citas
            </Link>
          </div>
        </div>
      </section>

      {/* Contenido general */}
      <div className="content-wrapper container">

        {/* Avisos */}
        <div className="recep-section mt-5">
          <h4 className="fw-bold mb-3">🔔 Avisos Importantes</h4>
          {noticias.map((n, i) => (
            <div key={i} className="recep-notice-card shadow-sm">{n}</div>
          ))}
        </div>

        {/* Médicos */}
        <div className="recep-section mt-5">
          <h4 className="fw-bold mb-3">🩺 Disponibilidad de Médicos</h4>
          <div className="row">
            {medicos.map((m, i) => (
              <div className="col-md-4 mb-3" key={i}>
                <div className="recep-doctor-card p-3 shadow-sm rounded-4">
                  <h6 className="fw-bold">{m.nombre}</h6>
                  <span className={m.disponible ? "status-yes" : "status-no"}>
                    {m.disponible ? "Disponible" : "No disponible"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel Estadísticas */}
        <div className="panel-es mt-4 panel-es-margin">
          <h2 className="text-center mb-4">📊 Panel de Estadísticas</h2>

          <Card className="p-3 mb-4 shadow stats-card">
            <h4>🏥 Porcentaje de ocupación</h4>
            <h2 className="text-success">{ocupacion}%</h2>
          </Card>

          <Card className="p-3 mb-4 shadow stats-card">
            <h4>⭐ Especialidades más solicitadas</h4>
            <table className="table table-striped mt-2">
              <thead>
                <tr>
                  <th>Especialidad</th>
                  <th>Total citas</th>
                </tr>
              </thead>
              <tbody>
                {topEspecialidades.map((esp, idx) => (
                  <tr key={idx}>
                    <td>{esp.especialidad}</td>
                    <td>{esp.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card className="p-3 shadow stats-card">
            <h4 className="mb-4">📅 Citas por día</h4>

            {citasDia.length > 0 ? (
              <BarChart width={600} height={300} data={citasDia}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#0d6efd" />
              </BarChart>
            ) : (
              <p>No hay datos disponibles.</p>
            )}
          </Card>
        </div>

      </div>
      <div className="footer-homerecep">
        <FooterPage />
      </div>
      
    </div>

  );
};
