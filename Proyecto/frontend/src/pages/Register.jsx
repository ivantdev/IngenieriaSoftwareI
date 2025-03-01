import "@/styles/App.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react"; // Importamos los estilos
import { Eye as EyeIcon, EyeOff as EyeOffIcon } from "lucide-react";
import useGlobalContext from "@/hooks/useGlobalContext";

function Register() {
  const navigate = useNavigate();

  const { addToast, user, setUser, globalState } = useGlobalContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passwordOcclude, setPasswordOcclude] = useState(true);

  const validateForm = () => {
    const newErrors = {};

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Invalid email format";
    }
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    if (password !== passwordConfirm) {
      newErrors.passwordConfirm = "Passwords do not match";
    }
    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!phoneNumber.match(/^\d{10,15}$/)) {
      newErrors.phoneNumber = "Phone number must be between 10-15 digits";
    }

    return newErrors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const newError = validateForm();
    if (Object.keys(newError).length !== 0) {
      addToast(Object.values(newError)[0], "error");
      return;
    }

    try {
      const response = await fetch(`${globalState.endpoint}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password,
          password_confirmation: passwordConfirm,
          phone: phoneNumber,
          first_name: firstName,
          last_name: lastName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser({
          ...user,
          name: `${data.data.first_name} ${data.data.last_name}`,
          email: data.data.email,
          isActiveSession: true,
        });
        navigate("/");
      } else {
        addToast("Por favor rellene bien los campos", "error");
      }
    } catch {
      addToast("Error al intentar iniciar sesión", "error");
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Registro de usuario</h2>
          <form onSubmit={handleRegister}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <br />
            <div className="password-container">
              <input
                type={passwordOcclude ? "password" : "text"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="material-icons eye-icon"
                onClick={(e) => {
                  e.preventDefault();
                  setPasswordOcclude(!passwordOcclude);
                }}
              >
                {passwordOcclude ? <EyeIcon /> : <EyeOffIcon />}
              </button>
            </div>
            <br />
            <div className="password-container">
              <input
                type={passwordOcclude ? "password" : "text"}
                placeholder="Confirmar Contraseña"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              <button
                className="eye-icon"
                onClick={(e) => {
                  e.preventDefault();
                  setPasswordOcclude(!passwordOcclude);
                }}
              >
                {passwordOcclude ? <EyeIcon /> : <EyeOffIcon />}
              </button>
            </div>
            <br />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <br />
            <button className={"submit-button"} type="submit">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
