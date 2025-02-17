import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@/styles/Login.css";
import "@/pages/RecuperarPassword.jsx";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [recordarme, setRecordarme] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (usuario === "admin" && password === "1234") {
      if (recordarme) {
        localStorage.setItem("usuario", usuario);
      } else {
        localStorage.removeItem("usuario");
      }
      localStorage.setItem("auth", "true");
      navigate("/");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Inicio de sesión</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <div className="remember-me">
            <label>
              <input
                type="checkbox"
                checked={recordarme}
                onChange={(e) => setRecordarme(e.target.checked)}
              />
              Recordarme
            </label>
            <a href="/recuperar" className="forgot-password">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
