import React from "react";
import { Link } from "react-router-dom";
import "../../../../css/sub_diseños/NosotrosEssalud.css"


export default function NosotrosEssalud() {
    return (
        <section className="nosotros-section">
            <div className="nosotros-hero">
                <div className="overlay"></div>
                <div className="hero-content">
                    <h1>Sobre Nosotros</h1>
                    <p>
                        Conoce la historia, misión y compromiso de EsSalud con la salud de todos los peruanos.
                    </p>
                </div>
            </div>


            <div className="nosotros-content">
                <div className="card">
                    <h2>Misión</h2>
                    <p>
                        Brindar servicios de salud integrales, oportunos y de calidad, orientados al bienestar y protección
                        de millones de asegurados en todo el país.
                    </p>
                </div>


                <div className="card">
                    <h2>Visión</h2>
                    <p>
                        Ser la institución líder del sector salud, innovadora, moderna y centrada en el paciente, garantizando
                        una atención humana, tecnológica y eficiente.
                    </p>
                </div>


                <div className="card">
                    <h2>Nuestro Compromiso</h2>
                    <p>
                        Trabajamos con vocación y responsabilidad para ofrecer atención médica especializada, infraestructura
                        de primer nivel y programas preventivos que protegen la salud de la población.
                    </p>
                </div>
                <Link className="btn-volver" to="/paciente/inicio">
                    ← Volver
                </Link>
            </div>
        </section>
    );
}