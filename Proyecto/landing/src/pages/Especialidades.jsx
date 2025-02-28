import Header from "@/components/Header";
import "@/styles/Especialidades.css";

function Especialidades() {
  return (
    <>
      <Header />
      <main className="especialidades__main">
        <h1>Especialidades</h1>
        <section className="especialidades__lista">
          <article>
            <h2>Cardiología</h2>
            <p>
              Diagnóstico y tratamiento de enfermedades del corazón, como
              hipertensión, insuficiencia cardíaca y arritmias.
            </p>
          </article>

          <article>
            <h2>Pediatría</h2>
            <p>
              Atención médica especializada para niños y adolescentes,
              asegurando su desarrollo y bienestar.
            </p>
          </article>

          <article>
            <h2>Neurología</h2>
            <p>
              Diagnóstico y tratamiento de enfermedades del sistema nervioso,
              como migrañas, epilepsia y Parkinson.
            </p>
          </article>

          <article>
            <h2>Traumatología y Ortopedia</h2>
            <p>
              Cuidado de lesiones óseas, musculares y articulares, incluyendo
              fracturas y cirugías ortopédicas.
            </p>
          </article>

          <article>
            <h2>Dermatología</h2>
            <p>
              Tratamiento especializado para enfermedades de la piel, como acné,
              dermatitis y cáncer de piel.
            </p>
          </article>

          <article>
            <h2>Rehabilitación Física</h2>
            <p>
              Programas de recuperación para pacientes con lesiones o
              postoperatorios, mejorando su movilidad y calidad de vida.
            </p>
          </article>

          <article>
            <h2>Cirugía General</h2>
            <p>
              Procedimientos quirúrgicos programados y de emergencia para
              diversas patologías.
            </p>
          </article>
        </section>
      </main>
    </>
  );
}

export default Especialidades;
