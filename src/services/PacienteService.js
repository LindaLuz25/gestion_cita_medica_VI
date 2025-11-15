// src/services/PacienteService.js
import { CitasService } from "./CitasService";

export const PacienteService = {
  getEspecialidades: async () => {
    return [
      { id: 1, nombre: "Cardiología" },
      { id: 2, nombre: "Dermatología" },
      { id: 3, nombre: "Pediatría" },
      { id: 4, nombre: "Medicina General" },
    ];
  },

  getMedicosByEspecialidad: async (especialidadId) => {
    const medicos = {
      1: [
        { id: 101, nombre: "Dr. Juan Pérez" },
        { id: 102, nombre: "Dra. Ana Rojas" },
      ],
      2: [
        { id: 201, nombre: "Dr. Luis Gómez" },
        { id: 202, nombre: "Dra. María Torres" },
      ],
      3: [
        { id: 301, nombre: "Dra. Patricia Ruiz" },
        { id: 302, nombre: "Dr. Esteban Campos" },
      ],
      4: [
        { id: 401, nombre: "Dr. Miguel Vargas" },
      ],
    };
    return medicos[especialidadId] || [];
  },

  getHorariosDisponibles: async (medicoId) => {
    const horarios = {
      101: ["08:00", "09:00", "10:00", "11:00"],
      102: ["13:00", "14:00", "15:00"],
      201: ["08:30", "09:30", "10:30"],
      202: ["14:00", "15:00"],
      301: ["09:00", "10:00", "11:00"],
      302: ["15:00", "16:00"],
      401: ["08:00", "09:00", "10:00"],
    };

    const citas = await CitasService.getAll();
    const ocupadas = citas.filter((c) => c.medicoId === medicoId).map((c) => c.hora);

    return horarios[medicoId].filter((h) => !ocupadas.includes(h));
  },

  registrarCita: async (dataCita) => {
    return await CitasService.save(dataCita);
  },

  getCitasPorPaciente: async (dni) => {
    return await CitasService.getByPaciente(dni);
  },
};
