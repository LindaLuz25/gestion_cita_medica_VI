import React from "react";

export const MedicosDisponiblesCard = ({ medicos }) => {
  if (!medicos || medicos.length === 0) {
    return (
      <div className="info-card shadow-sm p-4 rounded-4 bg-white">
        <h5 className="text-primary fw-bold mb-2">👩‍⚕️ Médicos Disponibles</h5>
        <p className="text-muted">No hay médicos con horarios registrados.</p>
      </div>
    );
  }

  return (
    <div className="info-card shadow-sm p-4 rounded-4 bg-white">
      <h5 className="text-primary fw-bold mb-2">👩‍⚕️ Médicos Disponibles</h5>
      {medicos.map(m => (
        <div key={m.id} className="mb-2 text-start">
          <strong>{m.nombre} ({m.especialidad})</strong>
          <ul className="ps-3">
            {m.horarios.map((h, i) => (
              <li key={i}>
                {h.hora} - <span style={{color: h.estado === "disponible" ? "green" : "red"}}>{h.estado}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

