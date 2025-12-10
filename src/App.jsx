import React, { useEffect } from 'react'
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
import { DoctorJavier } from './components/sub-componets/paciente/sub-pages/DoctorJavier';
import { DoctorLuis } from './components/sub-componets/paciente/sub-pages/DoctorLuis';
import { DoctorMaria } from './components/sub-componets/paciente/sub-pages/DoctorMaria';
import NosotrosEssalud from './components/sub-componets/paciente/sub-pages/NosotrosEsSalud';
import "./css/App.css"

export const App = () => {
  useEffect(() => {
    function createHeart() {
      const heart = document.createElement("div");
      heart.classList.add("heart");

      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = Math.random() * 2 + 3 + "s";
      heart.innerText = "❄";
      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 5000);
    }

    const interval = setInterval(createHeart, 300);

    return () => clearInterval(interval);
  }, []); // <-- solo aquí, solo una vez
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
        <Route path="/doctor/javier" element={<DoctorJavier />}></Route>
        <Route path="/doctor/luis" element={<DoctorLuis />}></Route>
        <Route path="/doctora/maria" element={<DoctorMaria />}></Route>

        <Route path='/nosotros' element={<NosotrosEssalud />}></Route>


      </Routes>
    </Router>
  )
}
