export const HorariosService = {
  // Obtener horarios por médico
  getHorarios: (medicoId) => {
    const data = JSON.parse(localStorage.getItem("horariosMedicos")) || {};
    return data[medicoId] || [];
  },

  // Inicializar por única vez (si no existe)
  initHorarios: (medicoId, listaHorarios) => {
    const data = JSON.parse(localStorage.getItem("horariosMedicos")) || {};

    if (!data[medicoId]) {
      data[medicoId] = listaHorarios.map(h => ({
        hora: h,
        estado: "disponible"
      }));
      localStorage.setItem("horariosMedicos", JSON.stringify(data));
    }
  },

  // Obtener SOLO los disponibles
  getDisponibles: (medicoId) => {
    const data = JSON.parse(localStorage.getItem("horariosMedicos")) || {};
    const horarios = data[medicoId] || [];
    return horarios.filter(h => h.estado === "disponible").map(h => h.hora);
  },

  // Marcar un horario como ocupado
  ocupar: (medicoId, hora) => {
    const data = JSON.parse(localStorage.getItem("horariosMedicos")) || {};
    const horarios = data[medicoId];

    if (!horarios) return;

    const index = horarios.findIndex(h => h.hora === hora);
    if (index !== -1) horarios[index].estado = "ocupado";

    localStorage.setItem("horariosMedicos", JSON.stringify(data));
  },

  // Marcar un horario como disponible (se usa al cancelar o reprogramar)
  liberar: (medicoId, hora) => {
    const data = JSON.parse(localStorage.getItem("horariosMedicos")) || {};
    const horarios = data[medicoId];

    if (!horarios) return;

    const index = horarios.findIndex(h => h.hora === hora);
    if (index !== -1) horarios[index].estado = "disponible";

    localStorage.setItem("horariosMedicos", JSON.stringify(data));
  }
};
