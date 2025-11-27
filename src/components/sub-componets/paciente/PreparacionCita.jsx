import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/PreparacionCita.css";

export const PreparacionCita = () => {
    const navigate = useNavigate();

    return (
        <div className="prep-container">
            <div className="prep-card">
                <h2 className="prep-title">📝 Preparación para tu Cita Médica</h2>

                <p className="prep-desc">
                    Antes de asistir a tu consulta, asegúrate de llevar toda la documentación necesaria
                    y cumplir con las indicaciones previas para una mejor atención.
                </p>

                <h4 className="prep-subtitle">📌 Documentos Recomendados</h4>
                <ul className="prep-list">
                    <li>DNI o documento de identidad</li>
                    <li>Orden médica (si corresponde)</li>
                    <li>Carné de seguro</li>
                    <li>Historial médico relevante</li>
                </ul>

                <h4 className="prep-subtitle">⚠ Indicaciones Generales</h4>
                <ul className="prep-list">
                    <li>Llega 15 minutos antes de tu cita</li>
                    <li>No olvides usar mascarilla si el centro lo requiere</li>
                    <li>En ayunas si tu médico lo indicó</li>
                    <li>Si tienes síntomas, comunícalo antes de asistir</li>
                </ul>

                <button className="btn-volver" onClick={() => navigate("/paciente/inicio")}>
                    ← Volver
                </button>
            </div>
        </div>
    );
};
