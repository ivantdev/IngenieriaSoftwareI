import { useState } from "react";
import { useNavigate, NavLink } from "react-router";
import useGlobalContext from "@/hooks/useGlobalContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { addToast, user, setUser, globalState } = useGlobalContext();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${globalState.endpoint}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
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
        addToast("Credenciales incorrectas", "error");
      }
    } catch {
      addToast("Error al intentar iniciar sesión", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Inicio de sesión
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="flex flex-col gap-5">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>

          <div className="flex items-center justify-between">
            <NavLink to={"/recovery"}>¿Olvidaste tu contraseña?</NavLink>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
