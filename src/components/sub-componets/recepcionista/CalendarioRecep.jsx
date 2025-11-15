import React, { useEffect, useState } from "react";
import { CitasService } from "../../../services/CitasService";
import { Table, Card } from "react-bootstrap";
import "../../../css/CitasDelDia.css"
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export const CalendarioRecep = () => {
  const [citas, setCitas] = useState([]);
  const recepcionista = JSON.parse(localStorage.getItem("usuarioActivo")); // para saber su sede
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    const sede = usuarioActivo?.sede;

    // ✅ Validar antes de seguir
    if (!sede) {
      console.warn("⚠️ No se encontró sede en el usuario activo");
      return;
    }

    console.log("📅 getCitasDelDiaPorSede()");
    console.log("➡️ Sede recibida:", sede);

    const citas = CitasService.getCitasDelDiaPorSede(sede);
    console.log("📋 Citas filtradas:", citas);
    setCitas(citas);
  }, []);


  return (
    <div className="citas-container">
      <Card className="citas-card">
        <h3 className="mb-4">
          📅 Citas del día - {recepcionista.sede}
        </h3>

        <Table striped bordered hover responsive className="citas-table">
          <thead>
            <tr>
              <th>Hora</th>
              <th>Paciente</th>
              <th>Médico</th>
              <th>Especialidad</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {citas.length > 0 ? (
              citas.map((cita) => (
                <tr key={cita.id}>
                  <td>{cita.hora}</td>
                  <td>{cita.nombrePaciente}</td>
                  <td>{cita.medicoNombre || "Dr. —"}</td>
                  <td>{cita.especialidadNombre || "—"}</td>
                  <td>{cita.estado || "Pendiente"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No hay citas registradas para hoy.
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* 🔙 Botón para volver */}
        <Button
          variant="secondary"
          className="citas-btn-volver"
          onClick={() => navigate('/recepcionista/inicio')}
        >
          ⬅ Volver al inicio
        </Button>
      </Card>
    </div>
  );
};
