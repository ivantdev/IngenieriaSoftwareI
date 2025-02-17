import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import "@/styles/Horarios.css"; // Importamos el nuevo CSS para Horarios

function Horarios() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <main className="horarios-container">
        <h1 className="horarios-titulo">Horarios</h1>
        <div className="horarios-content">
          <h2>Urgencias</h2>
          <p>
            Nuestro servicio de urgencias está disponible las 24 horas del día,
            los 7 días de la semana, para atender cualquier emergencia médica de
            manera inmediata.
          </p>

          <h2>Laboratorio Clínico</h2>
          <p>
            <strong>Lunes a Viernes:</strong> 7:00 AM - 5:00 PM
          </p>
          <p>
            <strong>Sábados:</strong> 7:00 AM - 12:00 PM
          </p>
          <p>
            <strong>Domingos y Festivos:</strong> Cerrado
          </p>

          <h2>Imágenes Diagnósticas</h2>
          <p>
            <strong>Lunes a Viernes:</strong> 7:30 AM - 5:30 PM
          </p>
          <p>
            <strong>Sábados:</strong> 8:00 AM - 1:00 PM
          </p>
          <p>
            <strong>Domingos y Festivos:</strong> Cerrado
          </p>

          <h2>Consultas Externas</h2>
          <p>
            <strong>Lunes a Viernes:</strong> 8:00 AM - 4:00 PM
          </p>
          <p>
            <strong>Sábados:</strong> 8:00 AM - 12:00 PM
          </p>
          <p>
            <strong>Domingos y Festivos:</strong> Cerrado
          </p>

          <h2>Rehabilitación Física</h2>
          <p>
            <strong>Lunes a Viernes:</strong> 8:00 AM - 6:00 PM
          </p>
          <p>
            <strong>Sábados:</strong> 8:00 AM - 1:00 PM
          </p>
          <p>
            <strong>Domingos y Festivos:</strong> Cerrado
          </p>
          <p>
            <em>
              Nota: Se recomienda agendar cita previa para sesiones de
              fisioterapia.
            </em>
          </p>

          <h2>Hospitalización</h2>
          <p>
            El área de hospitalización opera las 24 horas del día, garantizando
            atención constante a nuestros pacientes internos.
          </p>

          <button
            className="horarios-button"
            onClick={() => navigate("/hospital-info")}
          >
            Volver a Información
          </button>
        </div>
      </main>
    </>
  );
}

export default Horarios;
