import React, { useEffect, useState } from "react";
import { CitasService } from "../../../services/CitasService";
import { Table, Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { HorariosService } from "../../../services/HorarioService";

export const GestionarCitaRecep = () => {
    const navigate = useNavigate();
    const recepcionista = JSON.parse(localStorage.getItem("usuarioActivo"));
    const [citas, setCitas] = useState([]);
    const [editando, setEditando] = useState(null);
    const [nuevaFecha, setNuevaFecha] = useState("");
    const [nuevaHora, setNuevaHora] = useState("");

    useEffect(() => {
        const sede = recepcionista?.sede;
        const data = CitasService.getBySede(sede);
        setCitas(data);
    }, []);

    // ❌ Cancelar cita
    const cancelarCita = (id) => {
        if (!window.confirm("¿Seguro que deseas cancelar esta cita?")) return;

        const cita = citas.find(c => c.id === id);

        // 1️⃣ Liberar el horario
        HorariosService.liberar(cita.medicoId, cita.hora);

        // 2️⃣ Eliminar la cita
        const nuevas = citas.filter((c) => c.id !== id);

        // 3️⃣ Guardar cambios
        setCitas(nuevas);
        CitasService.updateAll(nuevas);

        alert("✔ Cita cancelada exitosamente");
    };


    // ✏ Reprogramar cita (abrir formulario)
    const iniciarReprogramar = (cita) => {
        setEditando(cita.id);
        setNuevaFecha(cita.fechaRegistro.split(",")[0]);
        setNuevaHora(cita.hora);
    };

    const guardarReprogramacion = (id) => {
        if (!nuevaFecha || !nuevaHora) {
            alert("⚠ Debes seleccionar nueva fecha y hora");
            return;
        }

        const cita = citas.find(c => c.id === id);

        // 1️⃣ Liberar hora anterior
        HorariosService.liberar(cita.medicoId, cita.hora);

        // 2️⃣ Verificar que la nueva hora esté disponible
        const disponibles = HorariosService.getDisponibles(cita.medicoId);
        if (!disponibles.includes(nuevaHora)) {
            alert("⚠ Ese horario ya está ocupado. Selecciona otro.");
            return;
        }

        // 3️⃣ Ocupar la nueva hora
        HorariosService.ocupar(cita.medicoId, nuevaHora);

        // 4️⃣ Actualizar cita
        const nuevas = citas.map((c) =>
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
        CitasService.updateAll(nuevas);

        setEditando(null);
        alert("✔ Cita reprogramada correctamente");
    };

    // ✔ Marcar cita como completada
    const marcarCompletada = (id) => {
        if (!window.confirm("¿Confirmar que la cita ya fue atendida?")) return;

        const nuevas = citas.map(c =>
            c.id === id
                ? { ...c, estado: "Completada" }
                : c
        );

        setCitas(nuevas);
        CitasService.updateAll(nuevas);

        alert("✔ Cita marcada como completada");
    };



    return (
        <div className="citas-container" >
            <Card className="citas-card" style={{ maxWidth: "1100px", margin: "20px auto", padding: "1rem" }}>
                <h3 className="mb-4">📋 Gestionar Citas – {recepcionista.sede}</h3>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Paciente</th>
                            <th>Médico</th>
                            <th>Especialidad</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citas.map((cita) => (
                            <tr key={cita.id}>
                                {/* Si la cita está en modo edición */}
                                {editando === cita.id ? (
                                    <>
                                        <td>
                                            <Form.Control
                                                type="date"
                                                value={nuevaFecha}
                                                onChange={(e) => setNuevaFecha(e.target.value)}
                                            />
                                        </td>

                                        <td>
                                            <Form.Control
                                                type="time"
                                                value={nuevaHora}
                                                onChange={(e) => setNuevaHora(e.target.value)}
                                            />
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{cita.fechaRegistro?.split(",")[0]}</td>
                                        <td>{cita.hora}</td>
                                    </>
                                )}

                                <td>{cita.nombrePaciente}</td>
                                <td>{cita.medicoNombre}</td>
                                <td>{cita.especialidadNombre}</td>
                                <td>{cita.estado || "Pendiente"}</td>

                                <td className="text-center">
                                    {/* Botones según estado */}
                                    {editando === cita.id ? (
                                        <>
                                            <Button
                                                size="sm"
                                                variant="success"
                                                onClick={() => guardarReprogramacion(cita.id)}
                                            >
                                                Guardar
                                            </Button>{" "}
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                onClick={() => setEditando(null)}
                                            >
                                                Cancelar
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            {cita.estado === "Completada" ? (
                                                <span className="text-success fw-bold">✔ Atendida</span>
                                            ) : (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        variant="success"
                                                        onClick={() => marcarCompletada(cita.id)}
                                                    >
                                                        Finalizar
                                                    </Button>{" "}
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

                <Button variant="secondary" onClick={() => navigate("/recepcionista/inicio")}>
                    ⬅ Volver
                </Button>
            </Card>
        </div>
    );
};
