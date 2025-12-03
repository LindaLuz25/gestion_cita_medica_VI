// MedicosDisponibles.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/MedicosDisponibles.css";

export const MedicosDisponibles = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  const [medicos, setMedicos] = useState([]);

  useEffect(() => {
    if (!usuario) {
      navigate("/login");
      return;
    }

    // Ejemplo de médicos
    setMedicos([
      {
        id: "101",
        nombre: "Dra. Rossana Castillo",
        especialidad: "Pediatría",
        horarios: [
          { hora: "08:00", estado: "disponible" },
          { hora: "09:00", estado: "ocupado" },
          { hora: "10:00", estado: "disponible" },
        ],
      },
      {
        id: "102",
        nombre: "Dr. Amparo Villena",
        especialidad: "Cardiología",
        horarios: [
          { hora: "08:30", estado: "ocupado" },
          { hora: "09:30", estado: "disponible" },
          { hora: "10:30", estado: "disponible" },
        ],
      },
      {
        id: "103",
        nombre: "Dr. Carlos Torres",
        especialidad: "Medicina General",
        horarios: [
          { hora: "08:15", estado: "disponible" },
          { hora: "09:15", estado: "ocupado" },
          { hora: "10:15", estado: "disponible" },
        ],
      },
    ]);
  }, []);

  return (
    <div className="medicos-container">
      <div className="medicos-card">
        <h2 className="medicos-title">👩‍⚕️ Médicos Disponibles</h2>
        <p className="medicos-desc">Consulta los horarios de los médicos disponibles</p>

        <table className="medicos-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Especialidad</th>
              <th>Horario</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {medicos.map((m) =>
              m.horarios.map((h, i) => (
                <tr key={`${m.id}-${i}`}>
                  <td>{m.nombre}</td>
                  <td>{m.especialidad}</td>
                  <td>{h.hora}</td>
                  <td className={h.estado === "disponible" ? "estado-disponible" : "estado-ocupado"}>
                    {h.estado.charAt(0).toUpperCase() + h.estado.slice(1)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <button className="btn-volver" onClick={() => navigate("/recepcionista/inicio")}>
          🔙 Volver a Home
        </button>
      </div>
    </div>
  );
};

