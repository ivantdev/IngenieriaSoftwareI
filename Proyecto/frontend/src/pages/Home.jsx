import Dashboard from "@/components/Dashboard";
import useGlobalContext from "@/hooks/useGlobalContext";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const { addToast, user } = useGlobalContext();

  useEffect(() => {
    if (!user) return;

    if (!user.isActiveSession) {
      addToast("Debes iniciar sesión. Home", "error");
      navigate("/login");
    }
  }, [user, navigate, addToast]);

  if (!user || !user.isActiveSession) {
    return null; // Evita renderizar el Dashboard antes de la navegación
  }

  return <Dashboard />;
}

export default App;
