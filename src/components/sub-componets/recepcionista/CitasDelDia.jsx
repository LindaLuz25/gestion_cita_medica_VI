import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/CitasDelDia.css";

export const CitasDelDia = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    if (!usuario) {
      navigate("/login");
      return;
    }

    // Ejemplo de citas
    setCitas([
      { id: 1, paciente: "Juan Pérez", hora: "08:00", estado: "disponible" },
      { id: 2, paciente: "María López", hora: "09:00", estado: "ocupado" },
      { id: 3, paciente: "Carlos Torres", hora: "10:00", estado: "disponible" },
    ]);
  }, []);

  return (
    <div className="citas-container">
      <div className="citas-card">
        <h2 className="citas-title">📆 Citas del Día</h2>
        <p className="citas-desc">Consulta rápida de las citas programadas</p>

        <table className="citas-table">
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Hora</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {citas.map(c => (
              <tr key={c.id}>
                <td>{c.paciente}</td>
                <td>{c.hora}</td>
                <td className={c.estado === "disponible" ? "estado-disponible" : "estado-ocupado"}>
                  {c.estado.charAt(0).toUpperCase() + c.estado.slice(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="btn-volver" onClick={() => navigate("/recepcionista/inicio")}>
          🔙 Volver a Home
        </button>
      </div>
    </div>
  );
};


