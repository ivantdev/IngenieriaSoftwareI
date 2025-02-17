import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@/styles/Login.css";

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
