import { useState, useEffect } from "react";
import "@/styles/PatientEgress.css"; // Importamos el archivo CSS
import { getCSRFToken, fetchWithAuth } from "@/utils/";
import useGlobalContext from "@/hooks/useGlobalContext";

const PatientEgress = () => {
  const [searchType, setSearchType] = useState("id_number");
  const [searchValue, setSearchValue] = useState("");
  const [admissions, setAdmissions] = useState([]);
  const [filteredAdmissions, setFilteredAdmissions] = useState([]);
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [dischargeType, setDischargeType] = useState("");
  const [dischargeNotes, setDischargeNotes] = useState("");
  const [dischargeDate, setDischargeDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [step, setStep] = useState(1);
  const { globalState, addToast, setUser } = useGlobalContext();

  useEffect(() => {
    const fetchAdmissions = async () => {
      console.log("🚀 Ejecutando fetchAdmissions..."); // 🔍 Verifica si se ejecuta

      const url = `${globalState.endpoint}/patient-admissions/`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(),
        },
      };
      try {
        const response = await fetchWithAuth(url, options, setUser);

        console.log("📌 Respuesta recibida:", response); // Verifica si hay respuesta

        const data = await response.json();
        console.log("📌 Datos recibidos:", data); // Verifica si hay datos

        if (data.status === "success") {
          setAdmissions(data.data);
          addToast("✅ Admisiones cargadas correctamente.", "success");
        } else {
          console.error("⚠️ Error en la respuesta del servidor:", data);
        }
      } catch (error) {
        console.error("❌ Error al obtener las admisiones:", error);
      }
    };

    fetchAdmissions();
  }, []);

  useEffect(() => {
    if (searchValue.trim() === "") {
      setFilteredAdmissions([]);
      return;
    }

    const filtered = admissions.filter((admission) => {
      // Verificar si la admisión tiene pre_registration y patient
      if (!admission.pre_registration || !admission.pre_registration.patient) {
        console.log("❌ Admisión sin paciente, se descarta:", admission);
        return false;
      }

      const patient = admission.pre_registration.patient;

      // 📌 Agregamos estos console.log para depuración
      const fieldToSearch = patient[searchType]?.toString().toLowerCase();
      console.log(
        `🔍 Buscando en campo: "${searchType}", valor en datos: "${fieldToSearch}"`,
      );
      console.log(
        `🔍 Valor ingresado por usuario: "${searchValue.toLowerCase()}"`,
      );

      const inputValue = searchValue.toLowerCase();

      return fieldToSearch?.includes(inputValue);
    });

    console.log("✅ Pacientes filtrados:", filtered);

    console.log("✅ Admisiones después del filtro:", filtered);

    console.log("✅ Pacientes filtrados:", filtered);

    console.log("Pacientes filtrados:", filtered); // 🔹 Verifica si encuentra pacientes
    setFilteredAdmissions(filtered);
  }, [searchValue, searchType, admissions]);

  const handleSelectAdmission = (admission) => {
    setSelectedAdmission(admission);
    setStep(2);
  };

  const handleDischarge = async () => {
    if (!dischargeType.trim() || !dischargeNotes.trim()) {
      alert("❌ Todos los campos son obligatorios.");
      return;
    }

    if (!selectedAdmission || !selectedAdmission.id) {
      console.error("❌ No hay una admisión seleccionada.");
      return;
    }

    const updatedAdmission = {
      pre_registration_id: selectedAdmission.pre_registration.id, // 🔹 La API lo espera
      admission_type: selectedAdmission.admission_type || "emergency", // Si es requerido
      triage_level: selectedAdmission.triage_level || 2, // Si es requerido
      discharge_type: dischargeType,
      discharge_notes: dischargeNotes,
      discharge_date: dischargeDate,
    };

    console.log(
      "📌 Enviando PUT a:",
      `http://127.0.0.1:8000/api/patient-admissions/${selectedAdmission.id}/`,
    );
    console.log("📌 Datos enviados:", updatedAdmission);

    try {
      const url = `${globalState.endpoint}/patient-admissions/`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(),
        },
        body: JSON.stringify(updatedAdmission),
      };
      const response = await fetchWithAuth(url, options, setUser);

      const data = await response.json();
      console.log("📌 Respuesta del servidor:", data);

      if (response.ok) {
        alert("✅ Paciente dado de alta correctamente.");

        // 🔹 Actualizar estado local para reflejar el alta sin recargar la página
        setAdmissions((prevAdmissions) =>
          prevAdmissions.map((admission) =>
            admission.id === selectedAdmission.id
              ? {
                ...admission,
                ...updatedAdmission,
                updated_at: new Date().toISOString(),
              }
              : admission,
          ),
        );

        setStep(3);
      } else {
        console.error("❌ Error en la respuesta del servidor:", data);
      }
    } catch (error) {
      console.error("❌ Error de conexión:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Salida de pacientes</h2>

      {step === 1 && (
        <div className="card">
          <h3 className="subtitle">Buscar paciente</h3>
          <p>
            Si el paciente no aparece en la búsqueda,{" "}
            <a href="/register" className="link">
              use este enlace
            </a>{" "}
            para registrar la información.
          </p>

          <div className="filterContainer">
            <label>Filtrar por:</label>
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="select"
            >
              <option value="id_number">Identificación</option>
              <option value="first_name">Nombre</option>
              <option value="last_name">Apellido</option>
            </select>

            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Ingrese el valor a filtrar"
              className="input"
            />
          </div>

          {filteredAdmissions.length > 0 && (
            <div className="results">
              <h4>Resultados:</h4>
              <ul className="list">
                {filteredAdmissions.map((admission) => {
                  const patient = admission.pre_registration.patient;
                  return (
                    <li
                      key={admission.id}
                      className="listItem"
                      onClick={() => handleSelectAdmission(admission)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleSelectAdmission(admission);
                        }
                      }}
                      tabIndex="0"
                    >
                      {patient.first_name} {patient.last_name} - ID:{" "}
                      {patient.id_number}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}

      {step === 2 && selectedAdmission && (
        <div className="card">
          <h3 className="subtitle">Registrar salida</h3>
          <p>
            <strong>Paciente:</strong>{" "}
            {selectedAdmission.pre_registration.patient.first_name}{" "}
            {selectedAdmission.pre_registration.patient.last_name} (ID:{" "}
            {selectedAdmission.pre_registration.patient.id_number})
          </p>

          <label>Tipo de salida:</label>
          <select
            value={dischargeType}
            onChange={(e) => setDischargeType(e.target.value)}
            className="select"
          >
            <option value="">Seleccione una opción</option>
            <option value="normal">normal</option>
            <option value="transfer">Traslado</option>
            <option value="Other">Otro</option>
          </select>

          <label>Notas de salida:</label>
          <textarea
            value={dischargeNotes}
            onChange={(e) => setDischargeNotes(e.target.value)}
            className="textarea"
          />

          <label>Fecha de salida:</label>
          <input
            type="date"
            value={dischargeDate}
            onChange={(e) => setDischargeDate(e.target.value)}
            className="input"
          />

          <button className="button" onClick={handleDischarge}>
            Registrar salida
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="card">
          <h3 className="subtitle">Salida completada</h3>
          <p>
            El paciente{" "}
            <strong>
              {selectedAdmission.pre_registration.patient.first_name}{" "}
              {selectedAdmission.pre_registration.patient.last_name}
            </strong>{" "}
            ha sido dado de alta exitosamente.
          </p>
        </div>
      )}
    </div>
  );
};

export default PatientEgress;
