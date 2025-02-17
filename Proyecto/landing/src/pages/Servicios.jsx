import Header from "@/components/Header";
import "@/styles/Servicios.css";

const services = [
  {
    title: "Urgencias 🏥",
    description:
      "Atención inmediata y prioritaria las 24 horas del día para emergencias médicas de cualquier tipo. Contamos con especialistas en emergencias y tecnología avanzada para garantizar la mejor atención.",
    image: "/images/urgencias.jpg",
  },
  {
    title: "Laboratorio Clínico 🧪",
    description:
      "Pruebas diagnósticas con tecnología avanzada en hematología, química sanguínea, inmunología y microbiología, garantizando resultados precisos y confiables en el menor tiempo posible.",
    image: "/images/laboratorio.jpg",
  },
  {
    title: "Imágenes Diagnósticas 📷",
    description:
      "Radiografías, ecografías, tomografías computarizadas y resonancias magnéticas de última generación para un diagnóstico certero y rápido.",
    image: "/images/imagenes.jpg",
  },
  {
    title: "Consultas Externas 🩺",
    description:
      "Atención médica especializada en pediatría, cardiología, neurología, ginecología, entre otras, con un enfoque personalizado y humano.",
    image: "/images/consulta.jpg",
  },
  {
    title: "Rehabilitación Física 💪",
    description:
      "Terapias personalizadas para recuperación física y rehabilitación postoperatoria, con especialistas en fisioterapia y medicina deportiva.",
    image: "/images/rehabilitacion.jpg",
  },
  {
    title: "Hospitalización 🏩",
    description:
      "Habitaciones cómodas y monitoreo constante para la recuperación de pacientes, con atención médica y enfermería las 24 horas.",
    image: "/images/hospitalizacion.jpg",
  },
  {
    title: "Farmacia 💊",
    description:
      "Disponibilidad de medicamentos esenciales y productos de salud, con asesoramiento farmacéutico especializado.",
    image: "/images/farmacia.jpg",
  },
];

function Servicios() {
  return (
    <>
      <Header />
      <main className="services__main">
        <h1 className="services__title">Nuestros Servicios</h1>
        <div className="services__container">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-text">
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <button className="info-button">Más Información</button>
              </div>
              <img
                src={service.image}
                alt={service.title}
                className="service-image"
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default Servicios;
