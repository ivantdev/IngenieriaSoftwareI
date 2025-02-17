import PropTypes from "prop-types"; // ⬅ Importamos PropTypes
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("auth"); // Verificar sesión

  return isAuthenticated ? children : <Navigate to="/" />;
}

// ✅ Agregar validación de PropTypes
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
