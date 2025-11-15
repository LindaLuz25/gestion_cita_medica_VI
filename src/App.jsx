import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Principal } from './components/Principal';
import { Login } from "./components/Login";
import { HomePaciente } from "./components/sub-componets/paciente/HomePaciente";
import { HomeRecepcionista } from './components/sub-componets/recepcionista/HomeRecepcionista';
import { ReCitaPaci } from './components/sub-componets/paciente/ReCitaPaci';
import { CalendarioRecep } from './components/sub-componets/recepcionista/CalendarioRecep';

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
      </Routes>
    </Router>
  )
}
