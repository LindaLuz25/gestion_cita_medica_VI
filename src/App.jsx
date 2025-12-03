import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { Principal } from './components/Principal';
import { Login } from "./components/Login";
import { HomePaciente } from "./components/sub-componets/paciente/HomePaciente";
import { HomeRecepcionista } from './components/sub-componets/recepcionista/HomeRecepcionista';
import { ReCitaPaci } from "./components/sub-componets/paciente/ReCitaPaci";
import { CalendarioRecep } from './components/sub-componets/recepcionista/CalendarioRecep';
import { GestionarCitaRecep } from './components/sub-componets/recepcionista/GestionarCitaRecep';
import { ListaCitasPaciente } from './components/sub-componets/paciente/ListaCitasPaciente';
import { HistorialCitasPaciente } from './components/sub-componets/paciente/HistorialCitasPaciente';
import { PanelEstadisticas } from './components/sub-componets/analisis/PanelEstadisticas';
import { PreparacionCita } from "./components/sub-componets/paciente/PreparacionCita";
import { CitasDelDia } from './components/sub-componets/recepcionista/CitasDelDia';
import { MedicosDisponibles } from './components/sub-componets/recepcionista/MedicosDisponibles';

// Componente protector de rutas
const RutaProtegida = ({ rol, children }) => {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (!usuarioActivo || usuarioActivo.rol.toLowerCase() !== rol.toLowerCase()) {
    return <Navigate to="/login" />;
  }
  return children;
};

export const App = () => {
  return (
    <Router>
      <Routes>
        {/* Página inicial / login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/principal" element={<Principal />} />

        {/* Home paciente */}
        <Route path="/paciente/inicio" element={
          <RutaProtegida rol="paciente">
            <HomePaciente />
          </RutaProtegida>
        } />
        <Route path="/paciente/inicio/registrar-cita" element={<ReCitaPaci />} />
        <Route path="/paciente/inicio/mis-citas" element={<ListaCitasPaciente />} />
        <Route path="/paciente/inicio/citas-filtradas" element={<ListaCitasPaciente tipo="filtrado" />} />
        <Route path="/paciente/inicio/historial" element={<HistorialCitasPaciente />} />
        <Route path="/paciente/inicio/preparacion-cita" element={<PreparacionCita />} />

        {/* Home recepcionista */}
        <Route path="/recepcionista/inicio" element={
          <RutaProtegida rol="recepcionista">
            <HomeRecepcionista />
          </RutaProtegida>
        } />
        <Route path="/recepcionista/inicio/calendario" element={
          <RutaProtegida rol="recepcionista">
            <CalendarioRecep />
          </RutaProtegida>
        } />
        <Route path="/recepcionista/inicio/gestionar-cita" element={
          <RutaProtegida rol="recepcionista">
            <GestionarCitaRecep />
          </RutaProtegida>
        } />
        <Route path="/recepcionista/inicio/citas-del-dia" element={
          <RutaProtegida rol="recepcionista">
            <CitasDelDia />
          </RutaProtegida>
        } />
        <Route path="/recepcionista/inicio/medicos-disponibles" element={
          <RutaProtegida rol="recepcionista">
            <MedicosDisponibles />
          </RutaProtegida>
        } />

        {/* Panel estadísticas */}
        <Route path="/panel-estadisticas" element={
          <RutaProtegida rol="recepcionista">
            <PanelEstadisticas />
          </RutaProtegida>
        } />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};



