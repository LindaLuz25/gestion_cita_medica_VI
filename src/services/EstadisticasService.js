import { CitasService } from "./CitasService";
import { HorariosService } from "./HorarioService";

export const EstadisticasService = {
  // 📅 Citas por día (cantidad por fecha)
  citasPorDia: () => {
    const citas = CitasService.getAll();
    const conteo = {};

    citas.forEach(c => {
      const fecha = c.fechaRegistro?.split(",")[0];
      if (!conteo[fecha]) conteo[fecha] = 0;
      conteo[fecha]++;
    });

    return conteo;
  },

  // 🔢 Porcentaje de ocupación (citas / horarios disponibles)
  porcentajeOcupacion: () => {
    const citas = CitasService.getAll();
    const data = JSON.parse(localStorage.getItem("horariosMedicos")) || {};

    const todosLosHorarios = Object.values(data).flat(); // array global

    const totalSlots = todosLosHorarios.length;
    const ocupados = citas.length;

    if (totalSlots === 0) return 0;

    return Math.round((ocupados / totalSlots) * 100);
  },


  // ⭐ Top especialidades más solicitadas
  topEspecialidades: () => {
    const citas = CitasService.getAll();
    const conteo = {};

    citas.forEach(c => {
      const esp = c.especialidadNombre;
      if (!conteo[esp]) conteo[esp] = 0;
      conteo[esp]++;
    });

    // Ordenar desc y devolver top 3
    return Object.entries(conteo)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([especialidad, total]) => ({ especialidad, total }));
  }
};
