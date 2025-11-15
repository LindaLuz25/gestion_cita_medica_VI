import React from 'react'

export const Principal = () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (!usuario) {
        window.location.href = "/";
        return null;
    }

    return (
        <>
            <div className="container mt-5">
                <h2>Bienvenido, {usuario.nombre}</h2>
                <p>Rol: <strong>{usuario.rol}</strong></p>

                {usuario.rol === "paciente" && (
                    <div>
                        <h4>Panel del Paciente</h4>
                        <p>Aquí verá sus citas, médicos disponibles, etc.</p>
                    </div>
                )}

                {usuario.rol === "recepcionista" && (
                    <div>
                        <h4>Panel del Recepcionista</h4>
                        <p>Aquí podrá gestionar pacientes y citas.</p>
                    </div>
                )}
            </div>
        </>

    )
}
