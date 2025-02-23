import Dashboard from "@/components/Dashboard";
import useGlobalContext from "@/hooks/useGlobalContext";
import { useNavigate } from "react-router";

function App() {
  const navigate = useNavigate();
  const { addToast, user } = useGlobalContext();

  if (!user) {
    return;
  }

  if (!user.isActiveSession) {
    addToast("Debes iniciar sesión", "error");
    navigate("/login");
  }

  return <Dashboard />;
}

export default App;
