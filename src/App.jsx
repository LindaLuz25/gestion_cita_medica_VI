import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Principal } from './components/Principal';
import { Login } from "./components/Login";
import { HomePaciente } from "./components/sub-componets/paciente/HomePaciente";
import { HomeRecepcionista } from './components/sub-componets/recepcionista/HomeRecepcionista';
import { ReCitaPaci } from './components/sub-componets/paciente/ReCitaPaci';
import { CalendarioRecep } from './components/sub-componets/recepcionista/CalendarioRecep';
import { GestionarCitaRecep } from './components/sub-componets/recepcionista/GestionarCitaRecep';
import { ListaCitasPaciente } from './components/sub-componets/paciente/ListaCitasPaciente';
import { HistorialCitasPaciente } from './components/sub-componets/paciente/HistorialCitasPaciente';
import { RutaProtegida } from './components/sub-componets/analisis/RutaProtegida';
import { PanelEstadisticas } from './components/sub-componets/analisis/PanelEstadisticas';
import { PreparacionCita } from "./components/sub-componets/paciente/PreparacionCita";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/recepcionista/inicio" element={<HomeRecepcionista />} />

        {/* 🧩 Rutas anidadas del paciente */}
        <Route path="/paciente/inicio" element={<HomePaciente />} />
        <Route path="/paciente/inicio/registrar-cita" element={<ReCitaPaci />} />
        <Route path="/recepcionista/inicio/calendario" element={<CalendarioRecep />} />
        <Route path="/recepcionista/inicio/gestionar-cita" element={<GestionarCitaRecep />} />
        <Route path="/paciente/inicio/mis-citas" element={<ListaCitasPaciente />} />
        <Route path="/paciente/inicio/citas-filtradas" element={<ListaCitasPaciente tipo="filtrado" />} />
        <Route path="/paciente/inicio/historial" element={<HistorialCitasPaciente />} />
        <Route path="/paciente/inicio/preparacion-cita" element={<PreparacionCita />} />
        
        <Route path="/panel-estadisticas" element={
            <RutaProtegida rol="Recepcionista">
              <PanelEstadisticas />
            </RutaProtegida>
          }
        />


      </Routes>
    </Router>
  )
}
