import { CitasService } from "./CitasService";

export const RecepcionistaService = {
  getCitasDelDiaPorSede: async (sede) => {
    return await CitasService.getBySedeAndDate(sede);
  },
};