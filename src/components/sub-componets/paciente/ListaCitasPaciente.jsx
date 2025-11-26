import React, { useEffect, useState } from "react";
import { CitasService } from "../../../services/CitasService";
import { Button, Table, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { HorariosService } from "../../../services/HorarioService";

export const ListaCitasPaciente = () => {
    const navigate = useNavigate();
    const paciente = JSON.parse(localStorage.getItem("usuarioActivo"));

    const [citas, setCitas] = useState([]);
    const [editando, setEditando] = useState(null);
    const [nuevaFecha, setNuevaFecha] = useState("");
    const [nuevaHora, setNuevaHora] = useState("");

    useEffect(() => {
        const todas = CitasService.getAll();
        const misCitas = todas.filter(c => c.pacienteId === paciente.id);
        setCitas(misCitas);
    }, []);

    // ❌ Cancelar cita
    const cancelarCita = (id) => {
        if (!window.confirm("¿Seguro que deseas cancelar esta cita?")) return;

        const cita = citas.find(c => c.id === id);
        HorariosService.liberar(cita.medicoId, cita.hora);

        const nuevas = citas.filter(c => c.id !== id);
        setCitas(nuevas);

        // actualizar localStorage global
        const todas = CitasService.getAll().filter(c => c.id !== id);
        CitasService.updateAll(todas);

        alert("✔ Cita cancelada exitosamente");
    };

    // ✏ Reprogramar
    const iniciarReprogramar = (cita) => {
        setEditando(cita.id);
        setNuevaFecha(cita.fechaRegistro.split(",")[0]);
        setNuevaHora(cita.hora);
    };

    const guardarReprogramacion = (id) => {
        if (!nuevaFecha || !nuevaHora) {
            alert("Debes seleccionar nueva fecha y hora");
            return;
        }

        const cita = citas.find(c => c.id === id);

        // liberar hora vieja
        HorariosService.liberar(cita.medicoId, cita.hora);

        // validar disponibilidad
        const disponibles = HorariosService.getDisponibles(cita.medicoId);
        if (!disponibles.includes(nuevaHora)) {
            alert("Ese horario ya está ocupado");
            return;
        }

        // ocupar nueva hora
        HorariosService.ocupar(cita.medicoId, nuevaHora);

        const nuevas = citas.map(c =>
            c.id === id
                ? {
                    ...c,
                    fechaRegistro: `${nuevaFecha}, ${nuevaHora}`,
                    hora: nuevaHora,
                    estado: "Reprogramada",
                }
                : c
        );

        setCitas(nuevas);

        // actualizar global
        const global = CitasService.getAll().map(c =>
            c.id === id
                ? {
                    ...c,
                    fechaRegistro: `${nuevaFecha}, ${nuevaHora}`,
                    hora: nuevaHora,
                    estado: "Reprogramada",
                }
                : c
        );
        CitasService.updateAll(global);

        setEditando(null);
        alert("✔ Cita reprogramada correctamente");
    };

    return (
        <div className="citas-container">
            <Card className="citas-card">
                <h3 className="mb-4">📅 Mis Citas</h3>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Médico</th>
                            <th>Especialidad</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citas.map(cita => (
                            <tr key={cita.id}>
                                {editando === cita.id ? (
                                    <>
                                        <td>
                                            <Form.Control
                                                type="date"
                                                value={nuevaFecha}
                                                disabled   // ⛔ Paciente no puede cambiar la fecha
                                            />

                                        </td>
                                        <td>
                                            <Form.Control
                                                type="time"
                                                value={nuevaHora}
                                                onChange={e => setNuevaHora(e.target.value)}
                                            />
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{cita.fechaRegistro.split(",")[0]}</td>
                                        <td>{cita.hora}</td>
                                    </>
                                )}

                                <td>{cita.medicoNombre}</td>
                                <td>{cita.especialidadNombre}</td>
                                <td>
                                    {cita.estado === "Completada" ? (
                                        <span className="text-success fw-bold">✔ Atendida</span>
                                    ) : (
                                        cita.estado || "Pendiente"
                                    )}
                                </td>


                                <td className="text-center">
                                    {editando === cita.id ? (
                                        <>
                                            <Button size="sm" variant="success" onClick={() => guardarReprogramacion(cita.id)}>
                                                Guardar
                                            </Button>{" "}
                                            <Button size="sm" variant="secondary" onClick={() => setEditando(null)}>
                                                Cancelar
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            {cita.estado === "Completada" ? (
                                                <span className="text-success fw-bold">✔ Finalizado</span>
                                            ) : (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        variant="warning"
                                                        onClick={() => iniciarReprogramar(cita)}
                                                    >
                                                        Reprogramar
                                                    </Button>{" "}
                                                    <Button
                                                        size="sm"
                                                        variant="danger"
                                                        onClick={() => cancelarCita(cita.id)}
                                                    >
                                                        Cancelar
                                                    </Button>
                                                </>
                                            )}
                                        </>
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
