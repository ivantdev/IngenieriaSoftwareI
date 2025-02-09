import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "/src/styles/login.css";
import Navbar from "/src/components/Navbar";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (usuario === "admin" && password === "1234") {
      localStorage.setItem("auth", "true");
      navigate("/dashboard");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div>
      <Navbar /> {/* ⬅ Agregamos la barra de navegación */}
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
            <button type="submit">Ingresar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
