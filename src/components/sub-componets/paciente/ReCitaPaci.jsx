import React, { useEffect, useState } from "react";
import { PacienteService } from "../../../services/PacienteService";
import { CitasService } from "../../../services/CitasService";
import { Card, Button, Form } from "react-bootstrap";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";
import "./ReCitaPaci.css";


export const ReCitaPaci = () => {
  const [sedes] = useState([
    { id: 1, nombre: "Sede Central" },
    { id: 2, nombre: "Sede Sur" },
    { id: 3, nombre: "Sede Norte" },
  ]);
  const navigate = useNavigate();

  const [especialidades, setEspecialidades] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [horarios, setHorarios] = useState([]);

  const [sede, setSede] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [medico, setMedico] = useState("");
  const [hora, setHora] = useState("");

  const [mensaje, setMensaje] = useState("");

  // Paciente logueado
  const paciente = JSON.parse(localStorage.getItem("usuarioActivo"));

  useEffect(() => {
    const fetchEspecialidades = async () => {
      const data = await PacienteService.getEspecialidades();
      setEspecialidades(data);
    };
    fetchEspecialidades();
  }, []);

  // Cuando cambia la especialidad, cargamos médicos
  const handleEspecialidadChange = async (e) => {
    const id = parseInt(e.target.value);
    setEspecialidad(id);
    setMedico("");
    setHora("");
    if (id) {
      const data = await PacienteService.getMedicosByEspecialidad(id);
      setMedicos(data);
    } else {
      setMedicos([]);
    }
  };

  // Cuando cambia médico, cargamos horarios disponibles
  const handleMedicoChange = async (e) => {
    const id = parseInt(e.target.value);
    setMedico(id);
    setHora("");
    if (id) {
      const data = await PacienteService.getHorariosDisponibles(id);
      setHorarios(data);
    } else {
      setHorarios([]);
    }
  };

  // Confirmar cita
  const handleRegistrarCita = async (e) => {
    e.preventDefault();

    if (!sede || !especialidad || !medico || !hora) {
      setMensaje("⚠️ Debes completar todos los campos antes de continuar.");
      return;
    }

    const dataCita = {
      id: Date.now(),
      dniPaciente: paciente.dni,
      nombrePaciente: paciente.nombre,
      sede,
      especialidadId: especialidad,
      especialidadNombre: especialidades.find(e => e.id === especialidad)?.nombre || "—",
      medicoId: medico,
      medicoNombre: medicos.find(m => m.id === medico)?.nombre || "—",
      hora,
      fechaRegistro: new Date().toLocaleString(),
    };


    const res = CitasService.registrar(dataCita);


    if (res.success) {
      // Enviar correo real por EmailJS
      const templateParams = {
        to_name: paciente.nombre,
        to_email: paciente.correo, // o el tuyo fijo si quieres probar
        sede: sede,
        especialidad: especialidades.find(e => e.id === especialidad)?.nombre,
        medico: medicos.find(m => m.id === medico)?.nombre,
        hora: hora,
      };

      emailjs
        .send(
          "service_e2nyk8i",     // lo copias de EmailJS
          "template_l9rjdv5",    // lo copias también
          templateParams,
          "UzHus0BIWuwSZ9sgG"      // este es tu public key
        )
        .then(() => {
          alert("📧 Correo de confirmación enviado con éxito!");
          navigate("/paciente/inicio");
        })
        .catch((error) => {
          console.error("Error enviando el correo:", error);
          alert("⚠️ No se pudo enviar el correo.");
          navigate("/paciente/inicio");
        });
    } else {
      setMensaje("❌ Error al registrar la cita.");
    }
  };

  return (
    <div className="recita-container">
      <Card className="shadow">
        <h3 className="mb-3 text-center">Registro de Cita Médica</h3>

        <Form onSubmit={handleRegistrarCita}>
          {/* SEDE */}
          <Form.Group className="mb-3">
            <Form.Label>Sede</Form.Label>
            <Form.Select
              value={sede}
              onChange={(e) => setSede(e.target.value)}
            >
              <option value="">Seleccione una sede</option>
              {sedes.map((s) => (
                <option key={s.id} value={s.nombre}>
                  {s.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* ESPECIALIDAD */}
          <Form.Group className="mb-3">
            <Form.Label>Especialidad</Form.Label>
            <Form.Select
              value={especialidad}
              onChange={handleEspecialidadChange}
            >
              <option value="">Seleccione una especialidad</option>
              {especialidades.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* MÉDICO */}
          {medicos.length > 0 && (
            <Form.Group className="mb-3">
              <Form.Label>Médico</Form.Label>
              <Form.Select value={medico} onChange={handleMedicoChange}>
                <option value="">Seleccione un médico</option>
                {medicos.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}

          {/* HORARIO */}
          {horarios.length > 0 && (
            <Form.Group className="mb-3">
              <Form.Label>Horario disponible</Form.Label>
              <Form.Select
                value={hora}
                onChange={(e) => setHora(e.target.value)}
              >
                <option value="">Seleccione un horario</option>
                {horarios.map((h, i) => (
                  <option key={i} value={h}>
                    {h}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}

          <Button type="button" variant="secondary" className="me-2" onClick={() => navigate('/paciente/inicio')}>
            ⬅ Volver al inicio
          </Button>

          <div className="text-center">
            <Button type="submit" variant="primary">
              Confirmar cita
            </Button>
          </div>
        </Form>

        {mensaje && (
          <div className="alert alert-info text-center mt-3">{mensaje}</div>
        )}
      </Card>
    </div>
  );
};
