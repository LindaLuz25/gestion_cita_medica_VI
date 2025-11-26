import React, { useEffect, useState } from "react";
import { EstadisticasService } from "../../../services/EstadisticasService";
import { useNavigate } from "react-router-dom";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card } from "react-bootstrap";

export const PanelEstadisticas = () => {
  const [citasDia, setCitasDia] = useState([]);
  const [ocupacion, setOcupacion] = useState(0);
  const [topEspecialidades, setTopEspecialidades] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const citasPorDiaObj = EstadisticasService.citasPorDia();
    const citasDiaArr = Object.entries(citasPorDiaObj).map(([fecha, total]) => ({
      fecha,
      total,
    }));

    setCitasDia(citasDiaArr);
    setOcupacion(EstadisticasService.porcentajeOcupacion());
    setTopEspecialidades(EstadisticasService.topEspecialidades());
  }, []);

  return (
    <div className="container mt-4">
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate("/recepcionista/inicio/gestionar-cita")}
      >
        ⬅ Volver
      </button>

      <h2 className="text-center mb-4">📊 Panel de Estadísticas</h2>

      {/* --- Porcentaje de ocupación --- */}
      <Card className="p-3 mb-4 shadow">
        <h4>🏥 Porcentaje de ocupación</h4>
        <h2 className="text-success">{ocupacion}%</h2>
      </Card>

      {/* --- Tabla de top especialidades --- */}
      <Card className="p-3 mb-4 shadow">
        <h4>⭐ Especialidades más solicitadas</h4>
        <table className="table table-striped mt-2">
          <thead>
            <tr>
              <th>Especialidad</th>
              <th>Total citas</th>
            </tr>
          </thead>
          <tbody>
            {topEspecialidades.map((esp, idx) => (
              <tr key={idx}>
                <td>{esp.especialidad}</td>
                <td>{esp.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>


      {/* --- Gráfico de Citas por Día --- */}
      <Card className="p-3 shadow">
        <h4 className="mb-4">📅 Citas por día</h4>

        {citasDia.length > 0 ? (
          <BarChart width={600} height={300} data={citasDia}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#0d6efd" />
          </BarChart>
        ) : (
          <p>No hay datos disponibles.</p>
        )}
      </Card>
    </div>
  );
};
