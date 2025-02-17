import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OpcionRecuperacion from "@/components/RecuperarPassword/OpcionRecuperacion";
import "@/styles/RecuperarPassword.css";

function RecuperarPassword() {
  const [step, setStep] = useState(1); // Controla los pasos del flujo
  const [usuario, setUsuario] = useState("");
  const [opcionRecuperacion, setOpcionRecuperacion] = useState("");
  const [codigo, setCodigo] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // 🔹 Simulación de base de datos de usuarios
  const usuarios = {
    usuario01: { email: "ni****@g*****.com", telefono: "*******35" },
    admin: { email: "ad****@admin.com", telefono: "*******99" },
  };

  // 📌 Paso 1: Verificar si el usuario existe
  const handleUsuarioSubmit = (e) => {
    e.preventDefault();
    if (usuarios[usuario]) {
      setStep(2);
    } else {
      alert("Usuario no encontrado.");
    }
  };

  // 📌 Paso 2: Seleccionar el medio de recuperación
  const handleOpcionSubmit = (e) => {
    e.preventDefault();
    if (!opcionRecuperacion) {
      alert("Selecciona un método de recuperación.");
      return;
    }
    setStep(3); // Muestra el formulario para ingresar el código
  };

  // 📌 Paso 3: Verificar el código ingresado
  const handleCodigoSubmit = (e) => {
    e.preventDefault();
    if (codigo === "123456") {
      setStep(4); // Muestra el formulario para cambiar la contraseña
    } else {
      alert("Código incorrecto.");
    }
  };

  // 📌 Paso 4: Cambiar la contraseña
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    alert("Contraseña cambiada con éxito.");
    navigate("/login");
  };

  return (
    <div className="recuperar-container">
      <div className="recuperar-box">
        {/* Paso 1: Ingresar Usuario */}
        {step === 1 && (
          <>
            <h2 className="recuperar-title">Recuperar contraseña</h2>
            <p>Ingresa tu usuario para continuar.</p>
            <form onSubmit={handleUsuarioSubmit}>
              <input
                type="text"
                placeholder="Nombre de usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
              <button type="submit">Continuar</button>
            </form>
          </>
        )}

        {/* Paso 2: Seleccionar Método de Recuperación */}
        {step == 2 && (
          <>
            <h2 className="recuperar-title">Recuperar contraseña</h2>
            <p>Elige un medio para recibir el código.</p>
            <form onSubmit={handleOpcionSubmit}>
              <OpcionRecuperacion
                value="email"
                label={usuarios[usuario]?.email}
                selected={opcionRecuperacion}
                onChange={setOpcionRecuperacion}
              />
              <OpcionRecuperacion
                value="telefono"
                label={usuarios[usuario]?.telefono}
                selected={opcionRecuperacion}
                onChange={setOpcionRecuperacion}
              />
              <button type="submit">Enviar Código</button>
            </form>
          </>
        )}

        {/* Paso 3: Ingresar Código de Verificación */}
        {step == 3 && (
          <>
            <h2 className="recuperar-title">Ingrese el código</h2>
            <form onSubmit={handleCodigoSubmit}>
              <input
                type="text"
                placeholder="Código recibido"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
              />
              <button type="submit">Verificar</button>
            </form>
          </>
        )}

        {/* Paso 4: Cambio de Contraseña */}
        {step == 4 && (
          <>
            <h2 className="recuperar-title">Cambio de contraseña</h2>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                placeholder="Contraseña nueva"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirmación de contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="submit">Ingresar</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default RecuperarPassword;
