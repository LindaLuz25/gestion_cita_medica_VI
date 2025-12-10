import React from "react";
import "../../../../css/sub_diseños/DoctorMaria.css"
import { Link } from "react-router-dom";

// Perfil Dra. María
export function DoctorMaria() {
    return (
        <div className="body-container-maria">
            <div class="container-doctor">
                <div class="card-doctor">
                    <img
                        src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg"
                        alt="Dra. María"
                    />

                    <div class="card-content">
                        <h1>Dra. María Fernández</h1>
                        <p class="subtitle">Especialista en Medicina General</p>

                        <p>
                            La Dra. María Fernández cuenta con más de 10 años de experiencia en
                            medicina general. Se especializa en el diagnóstico temprano, atención
                            preventiva y seguimiento de pacientes con enfermedades crónicas. Su
                            enfoque es brindar un trato humano y cercano.
                        </p>

                        <h2>Horarios de Atención</h2>
                        <ul>
                            <li>Lunes a Viernes: 9:00am - 1:00pm</li>
                            <li>Sábados: 10:00am - 12:00pm</li>
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