import { useNavigate } from "react-router-dom";
import "/src/styles/App.css"; // Importamos los estilos

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth"); // Eliminar sesión
    navigate("/"); // Redirigir a login
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h3>Menú</h3>
        <a href="/dashboard">Dashboard</a>
        <a href="/horarios">Horarios</a>
        <a href="/guias">Guías y protocolos</a>
        <a href="/pre-registro">Pre-registro de paciente</a>
        <a href="/notificaciones">Gestión de notificaciones</a>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>

      {/* Contenido principal */}
      <div className="dashboard-content">
        <h2>Gestión de Notificaciones</h2>
        <p>Aquí van las notificaciones...</p>
      </div>
    </div>
  );
}

export default Dashboard;
