import React from "react";
import "../css/FooterPage.css"

export const FooterPage= () => {
    return (

        <div class="footer-container">
            <footer class="footer">
                <div class="footer-section">
                    <h3>EsSalud</h3>
                    <p>Comprometidos con brindar atención médica de calidad a todos nuestros pacientes.</p>
                </div>


                <div class="footer-section">
                    <h4>Enlaces rápidos</h4>
                    <ul>
                        <li><a href="/paciente/inicio">Inicio</a></li>
                        <li><a href="/paciente/inicio/registrar-cita">Registrar Cita</a></li>
                        <li><a href="/paciente/inicio/mis-citas">Mis Citas</a></li>
                        <li><a href="/nosotros">Nosotros</a></li>
                    </ul>
                </div>


                <div class="footer-section">
                    <h4>Contacto</h4>
                    <p>📍 Lima, Perú</p>
                    <p>📞 (01) 411-8000</p>
                    <p>✉️ contacto@essalud.gob.pe</p>
                </div>
            </footer>


            <div class="footer-bottom">
                <p>© 2025 EsSalud. Todos los derechos reservados.</p>
            </div>
        </div>
    );
}