import React from "react";
import "../../../../css/sub_diseños/DoctorJavier.css"
import { Link } from "react-router-dom";
// Perfil Dr. Javier

export function DoctorJavier() {
    return (
        <div className="body-container-javier">
            <div class="doctor-container">
                <div class="doctor-card">
                    <img
                        src="https://images.pexels.com/photos/15960478/pexels-photo-15960478.jpeg"
                        alt="Dr. Javier"
                        class="doctor-img"
                    />
                    <div class="doctor-info">
                        <h1>Dr. Javier Alarcón</h1>
                        <p class="subtitle">Especialista en Cardiología</p>


                        <p>
                            El Dr. Javier Alarcón es cardiólogo reconocido por su trayectoria en
                            prevención, diagnóstico y tratamiento de enfermedades del corazón.
                            Su enfoque combina tecnología avanzada con atención personalizada.
                        </p>


                        <h2>Horarios de Atención</h2>
                        <ul>
                            <li>Lunes, Miércoles y Viernes: 8:00am - 12:00pm</li>
                            <li>Sábados: 8:00am - 11:00am</li>
                        </ul>
                        <Link className="btn-volver" to="/paciente/inicio">
                            ← Volver
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
}