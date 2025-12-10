import { useState } from "react";

export default function ResetPasswordModal({ open, onClose, onGenerate }) {
  const [dni, setDni] = useState("");
  const [tempPassword, setTempPassword] = useState(null);

  if (!open) return null;

  const generarPassword = () => {
    if (!/^\d{8}$/.test(dni)) {
      alert("El DNI debe tener 8 dígitos.");
      return;
    }

    const newPass = Math.random().toString(36).slice(-8).toUpperCase();
    setTempPassword(newPass);

    if (onGenerate) onGenerate(newPass);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-80">
        <h2 className="text-xl font-semibold text-center mb-4">Recuperar contraseña</h2>

        <label className="block text-sm mb-1">Ingresa tu DNI:</label>
        <input
          type="number"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-3"
          placeholder="DNI"
        />

        {tempPassword && (
          <div className="bg-green-100 text-green-700 p-2 rounded-lg mb-3 text-sm">
            Tu contraseña temporal es: <strong>{tempPassword}</strong>
          </div>
        )}

        <button
          onClick={generarPassword}
          className="w-full bg-blue-600 text-white py-2 rounded-lg mb-2"
        >
          Generar nueva contraseña
        </button>

        <button
          onClick={onClose}
          className="w-full bg-gray-300 text-black py-2 rounded-lg"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}