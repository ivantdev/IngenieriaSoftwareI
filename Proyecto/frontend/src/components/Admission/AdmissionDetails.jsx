import PropTypes from "prop-types";
import { useState } from "react";
import { useGlobalContext } from "@/hooks/useGlobalContext";

function AdmissionDetails({ onSubmit }) {
  const [admissionType, setAdmissionType] = useState("");
  const [triageLevel, setTriageLevel] = useState("");
  const [admissionNotes, setAdmissionNotes] = useState("");
  const { addToast } = useGlobalContext();

  const handleSubmit = () => {
    if (!admissionType || !triageLevel) {
      addToast("Por favor complete los campos de admisión", "error");
      return;
    }

    onSubmit({
      admission_type: admissionType,
      triage_level: triageLevel,
      admission_notes: admissionNotes,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Detalles de admisión</h2>

      {/* Admission types */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Tipo de admisión
        </label>
        <select
          value={admissionType}
          onChange={(e) => setAdmissionType(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Seleccione una opción</option>
          <option value="emergency">Emergencia</option>
          <option value="hospitalization">Hospitalización</option>
          <option value="scheduled_surgery">Cirugía programada</option>
          <option value="outpatient">Consulta externa</option>
          <option value="maternity">Maternidada</option>
          <option value="observation">Observación</option>
        </select>
      </div>

      {/* Triage levels */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Nivel Triaje
        </label>
        <select
          value={triageLevel}
          onChange={(e) => setTriageLevel(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Seleccione un nivel</option>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      {/* Admission notes */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Notas de admisión
        </label>
        <textarea
          value={admissionNotes}
          onChange={(e) => setAdmissionNotes(e.target.value)}
          placeholder="Escriba los detalles relevantes de la admisión"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          rows="4"
        ></textarea>
      </div>

      <div>
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

AdmissionDetails.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AdmissionDetails;
