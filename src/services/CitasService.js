export const CitasService = {
  // 🧩 Obtener todas las citas
  getAll: () => {
    const citas = JSON.parse(localStorage.getItem("citasMedicas")) || [];
    return citas;
  },

  // 🧩 Registrar nueva cita
  registrar: (cita) => {
    const citas = JSON.parse(localStorage.getItem("citasMedicas")) || [];
    citas.push(cita);
    localStorage.setItem("citasMedicas", JSON.stringify(citas));
    console.log("✅ Cita guardada:", cita);              // 👈 Nuevo
    console.log("📦 Todas las citas:", citas);           // 👈 Nuevo
    return { success: true };
  },


  // 🧩 Filtrar citas por sede
  getBySede: (sede) => {
    const citas = JSON.parse(localStorage.getItem("citasMedicas")) || [];
    return citas.filter(c => c.sede === sede);
  },

  // 🧩 Filtrar citas del día (simple)
  getCitasDelDiaPorSede: (sede) => {
    const citas = JSON.parse(localStorage.getItem("citasMedicas")) || [];
    const hoy = new Date().toLocaleDateString();

    console.log("📅 getCitasDelDiaPorSede()");
    console.log("➡️ Sede recibida:", sede);
    console.log("🕓 Fecha actual:", hoy);
    console.log("📋 Citas almacenadas:", citas.map(c => ({
      sede: c.sede,
      fechaRegistro: c.fechaRegistro
    })));

    const filtradas = citas.filter(
      c =>
        c.sede &&
        c.sede.toLowerCase() === sede.toLowerCase() &&
        c.fechaRegistro?.includes(hoy)
    );

    console.log("✅ Citas filtradas:", filtradas);
    return filtradas;
  },

};