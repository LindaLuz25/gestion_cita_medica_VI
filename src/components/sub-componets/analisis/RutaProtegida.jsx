import { Navigate } from "react-router-dom";
import { getUsuarioActivo } from "../../../services/userService";

export const RutaProtegida = ({ children, rol }) => {
  const usuario = getUsuarioActivo();

  // Si no hay usuario, redirige a login
  if (!usuario) return <Navigate to="/" />;

  // Normalizamos a lowercase porque tus usuarios base usan minúsculas
  const rolUsuario = usuario.rol.toLowerCase();
  const rolRequerido = rol.toLowerCase();

  if (rolUsuario !== rolRequerido) {
    alert("❌ No tienes permisos para acceder a este panel");
    return <Navigate to="/recepcionista/inicio" />;
  }

  return children;
};
