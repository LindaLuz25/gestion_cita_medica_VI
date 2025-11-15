import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../services/UserService";

export const Register = () => {
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");
  const [sede, setSede] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!dni || !nombre || !correo || !password || !rol) {
      alert("⚠️ Complete todos los campos requeridos.");
      return;
    }

    if (rol === "Recepcionista" && (!sede || !especialidad)) {
      alert("⚠️ Debes seleccionar sede y especialidad.");
      return;
    }

    const nuevoUsuario = {
      dni,
      nombre,
      correo,
      password,
      rol,
      sede: rol === "Recepcionista" ? sede : "",
      especialidad: rol === "Recepcionista" ? especialidad : "",
    };

    UserService.registrar(nuevoUsuario);
    alert("✅ Registro exitoso");
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <Card className="p-4 shadow">
        <h3 className="text-center mb-3">Registro de Usuario</h3>

        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label>DNI</Form.Label>
            <Form.Control
              type="text"
              maxLength="8"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Rol</Form.Label>
            <Form.Select value={rol} onChange={(e) => setRol(e.target.value)}>
              <option value="">Seleccione un rol</option>
              <option value="Paciente">Paciente</option>
              <option value="Recepcionista">Recepcionista</option>
            </Form.Select>
          </Form.Group>

          {rol === "Recepcionista" && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Sede</Form.Label>
                <Form.Select
                  value={sede}
                  onChange={(e) => setSede(e.target.value)}
                >
                  <option value="">Seleccione una sede</option>
                  <option value="Sede Central">Sede Central</option>
                  <option value="Sede Sur">Sede Sur</option>
                  <option value="Sede Norte">Sede Norte</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Especialidad</Form.Label>
                <Form.Select
                  value={especialidad}
                  onChange={(e) => setEspecialidad(e.target.value)}
                >
                  <option value="">Seleccione una especialidad</option>
                  <option value="Cardiología">Cardiología</option>
                  <option value="Pediatría">Pediatría</option>
                  <option value="Dermatología">Dermatología</option>
                </Form.Select>
              </Form.Group>
            </>
          )}

          <div className="text-center">
            <Button type="submit" variant="success">
              Registrarse
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};
