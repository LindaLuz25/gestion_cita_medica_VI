import React, { useEffect, useState } from "react";
import { Card, Table, Button } from "react-bootstrap";
import { CitasService } from "../../../services/CitasService";
import { useNavigate } from "react-router-dom";

export const HistorialCitasPaciente = () => {
    const navigate = useNavigate();
    const paciente = JSON.parse(localStorage.getItem("usuarioActivo"));

    const [citas, setCitas] = useState([]);

    useEffect(() => {
        const todas = CitasService.getAll();
        const misCitas = todas.filter(c => c.pacienteId === paciente.id);
        setCitas(misCitas);
    }, []);

    return (
        <div className="citas-container">
            <Card className="citas-card">
                <h3 className="mb-4">📄 Historial de Citas</h3>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Médico</th>
                            <th>Especialidad</th>
                        </tr>
                    </thead>

                    <tbody>
                        {citas.map(cita => (
                            <tr key={cita.id}>
                                <td>{cita.fechaRegistro.split(",")[0]}</td>
                                <td>{cita.hora}</td>
                                <td>{cita.medicoNombre}</td>
                                <td>{cita.especialidadNombre}</td>
                                <td>
                                    {cita.estado === "Completada" ? (
                                        <span className="text-success fw-bold">✔ Atendida</span>
                                    ) : (
                                        cita.estado
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Button variant="secondary" onClick={() => navigate("/paciente/inicio")}>
                    ⬅ Volver
                </Button>
            </Card>
        </div>
    );
};
