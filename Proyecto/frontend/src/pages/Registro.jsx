import { useNavigate } from "react-router-dom";
import "/src/styles/App.css";
import {useState} from "react"; // Importamos los estilos

function Registro() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.removeItem("auth"); // Eliminar sesión
    navigate("/"); // Redirigir a login
  };

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [cedula, setCedula] = useState("");
  const [passwordOcclude, setPasswordOcclude] = useState(true);

  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Registro de usuario</h2>
          <form onSubmit={handleLogin}>
            <input
                type="text"
                placeholder="Usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
            />
            <br/>
            <input
                type="number"
                placeholder="Cedula"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
            />
            <br/>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br/>
            <div className="password-container">
              <input
                  type={passwordOcclude ? "password" : "text"}
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
              <span
                  className="material-icons eye-icon"
                  onClick={() => setPasswordOcclude(!passwordOcclude)}
              >
                {passwordOcclude ? "visibility_off" : "visibility"}
              </span>
            </div>
            <br/>
            <div className="password-container">
              <input
                  type={passwordOcclude ? "password" : "text"}
                  placeholder="Confirmar Contraseña"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              <span
                  className="material-icons eye-icon"
                  onClick={() => setPasswordOcclude(!passwordOcclude)}
              >
                {passwordOcclude ? "visibility_off" : "visibility"}
              </span>
            </div>
            <br/>
            <button type="submit">Ingresar</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Registro;
