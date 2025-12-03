export function obtenerEstadoMedicos(medicos, disponibilidad, citas, fecha) {
  return medicos.map(medico => {
    const dispMedico = disponibilidad.find(
      d => d.medicoId === medico.id && d.fecha === fecha
    );

    if (!dispMedico) {
      return {
        ...medico,
        estado: "Sin disponibilidad configurada",
        horariosDisponibles: [],
        horariosOcupados: [],
      };
    }

    const citasMedico = citas
      .filter(c => c.medicoId === medico.id && c.fecha === fecha)
      .map(c => c.hora);

    const horariosLibres = dispMedico.horarios.filter(
      h => !citasMedico.includes(h)
    );

    const horariosOcupados = dispMedico.horarios.filter(
      h => citasMedico.includes(h)
    );

    return {
      ...medico,
      estado: horariosLibres.length > 0 ? "Disponible" : "Ocupado",
      horariosDisponibles: horariosLibres,
      horariosOcupados: horariosOcupados
    };
  });
}
