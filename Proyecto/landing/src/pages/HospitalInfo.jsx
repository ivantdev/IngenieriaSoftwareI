import "react";
import Header from "@/components/Header";
import "@/styles/HospitalInfo.css";
import { useNavigate } from "react-router-dom";

function HospitalInfo() {
  const navigate = useNavigate();
  return (
    <>
      <Header /> {/* ✅ Aquí se reutiliza el Header */}
      <main className="hospital-info">
        <h1 className="title">Información del Centro Médico</h1>

        <section className="info-section">
          <div className="info-card">
            <h2>Servicios</h2>
            <p>
              Ofrecemos una amplia gama de servicios médicos para cuidar de tu
              salud y la de tu familia. Desde atención en urgencias y
              hospitalización, hasta diagnósticos especializados en laboratorio
              e imágenes médicas. Descubre todo lo que podemos hacer por ti.
            </p>
            <div className="info-button-container">
              <button
                className="info-button"
                onClick={() => navigate("/servicios")}
              >
                Ver Servicios
              </button>
            </div>
          </div>

          <div className="info-card">
            <h2>Especialidades</h2>
            <p>
              Nuestro equipo de especialistas está preparado para atenderte en
              diversas áreas médicas como pediatría, cardiología, neurología y
              más. Recibe atención personalizada y de calidad en cada consulta y
              tratamiento.
            </p>
            <div className="info-button-container">
              <button
                className="info-button"
                onClick={() => navigate("/especialidades")}
              >
                Ver Especialidades
              </button>
            </div>
          </div>

          <div className="info-card">
            <h2>Ubicación</h2>
            <p>
              Encuéntranos fácilmente en nuestra dirección principal y accede al
              mapa interactivo para obtener indicaciones precisas. Estamos
              ubicados en una zona accesible para que llegues rápidamente, ya
              sea en transporte público o privado.
            </p>
            <div className="info-button-container">
              <button
                className="info-button"
                onClick={() => navigate("/ubicacion")}
              >
                Ver Ubicación
              </button>
            </div>
          </div>

          <div className="info-card">
            <h2>Horarios</h2>
            <p>
              En nuestro centro médico, estamos comprometidos con brindarte
              atención de calidad en los momentos que más lo necesitas. Consulta
              nuestros horarios de atención para cada servicio y planifica tu
              visita de manera fácil y sin contratiempos.
            </p>
            <div className="info-button-container">
              <button
                className="info-button"
                onClick={() => navigate("/horarios")}
              >
                Ver Horarios
              </button>
            </div>
          </div>
          <div className="contact-info">
            <h2>Información de Contacto</h2>
            <ul>
              <li>📞 Teléfono general: +57 (1) 123-4567</li>
              <li>🚑 Urgencias: +57 (1) 765-4321</li>
              <li>📧 Correo electrónico: contacto@hospital.com</li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}

export default HospitalInfo;
