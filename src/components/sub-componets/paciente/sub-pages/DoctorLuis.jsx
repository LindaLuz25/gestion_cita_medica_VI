import React from "react";
import "../../../../css/sub_diseños/DoctorLuis.css"
import { Link } from "react-router-dom";

export function DoctorLuis() {
    return (
        <div className="body-container-luis">
            <div class="doctor-container">
                <div class="doctor-card">
                    <img
                        src="https://images.pexels.com/photos/32160037/pexels-photo-32160037.jpeg"
                        alt="Dr. Luis"
                        class="doctor-img"
                    />


                    <div class="doctor-info">
                        <h1>Dr. Luis Ramos</h1>
                        <p class="subtitle">Especialista en Pediatría</p>


                        <p>
                            El Dr. Luis Ramos es un pediatra con amplia experiencia en el cuidado integral
                            de niños y adolescentes. Su trato paciente y amigable lo convierte en uno de
                            los más recomendados por las familias.
                        </p>


                        <h2>Horarios de Atención</h2>
                        <ul>
                            <li>Lunes a Viernes: 2:00pm - 6:00pm</li>
                            <li>Sábados: 9:00am - 12:00pm</li>
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