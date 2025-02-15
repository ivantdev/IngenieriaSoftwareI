import PropTypes from "prop-types";

function AdmissionCompleted({ admissionData, onNewAdmission }) {
  if (!admissionData) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-red-500 mb-4">
          Error: No se encontraron datos de la admisión
        </h2>
      </div>
    );
  }

  const {
    pre_registration,
    admission_date,
    discharge_date,
    admission_type,
    triage_level,
    admission_notes,
  } = admissionData;

  const ADMISSION_TYPES = {
    emergency: "Emergencia",
    hospitalization: "Hospitalización",
    scheduled_surgery: "Cirugía programada",
    outpatient: "Consulta externa",
    maternity: "Maternidad",
    observation: "Observación",
  };

  const { patient, medical_info } = pre_registration || {};

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Admisión Exitosa</h2>

      {/* Datos del paciente */}
      <div className="mb-4">
        <h3 className="text-md font-semibold mb-2">Información del Paciente</h3>
        <p>
          <strong>Nombre:</strong> {patient.first_name} {patient.last_name}
        </p>
        <p>
          <strong>Fecha de Nacimiento:</strong> {patient.birth_date}
        </p>
        <p>
          <strong>Tipo de Identificación:</strong> {patient.id_type}
        </p>
        <p>
          <strong>Número de Identificación:</strong> {patient.id_number}
        </p>
        <p>
          <strong>Teléfono de Contacto:</strong> {patient.contact_number}
        </p>
        <p>
          <strong>Email:</strong> {patient.email}
        </p>
      </div>

      {/* Información médica */}
      <div className="mb-4">
        <h3 className="text-md font-semibold mb-2">Información Médica</h3>
        <p>
          <strong>Motivo de Consulta:</strong> {medical_info.reason}
        </p>
        <p>
          <strong>Alergias:</strong> {medical_info.allergies}
        </p>
        <p>
          <strong>Condiciones Preexistentes:</strong>{" "}
          {medical_info.preexisting_conditions}
        </p>
      </div>

      {/* Detalles de la admisión */}
      <div className="mb-4">
        <h3 className="text-md font-semibold mb-2">Detalles de la Admisión</h3>
        <p>
          <strong>Fecha de Admisión:</strong>{" "}
          {new Date(admission_date).toLocaleString()}
        </p>
        <p>
          <strong>Fecha de Alta:</strong>{" "}
          {discharge_date
            ? new Date(discharge_date).toLocaleString()
            : "Aún no definida"}
        </p>
        <p>
          <strong>Tipo de Admisión:</strong> {ADMISSION_TYPES[admission_type]}
        </p>
        <p>
          <strong>Nivel de Triage:</strong> {triage_level}
        </p>
        <p>
          <strong>Notas de Admisión:</strong> {admission_notes}
        </p>
      </div>

      {/* Botón para nueva admisión */}
      <div className="mt-6">
        <button
          type="button"
          onClick={onNewAdmission}
          className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        >
          Nueva Admisión
        </button>
      </div>
    </div>
  );
}

AdmissionCompleted.propTypes = {
  admissionData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    pre_registration: PropTypes.shape({
      id: PropTypes.number.isRequired,
      patient: PropTypes.shape({
        id: PropTypes.number.isRequired,
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired,
        birth_date: PropTypes.string.isRequired,
        id_type: PropTypes.string.isRequired,
        id_number: PropTypes.string.isRequired,
        contact_number: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      }).isRequired,
      medical_info: PropTypes.shape({
        id: PropTypes.number.isRequired,
        reason: PropTypes.string.isRequired,
        allergies: PropTypes.string.isRequired,
        preexisting_conditions: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    admission_date: PropTypes.string.isRequired,
    discharge_date: PropTypes.string,
    admission_type: PropTypes.string.isRequired,
    triage_level: PropTypes.number.isRequired,
    admission_notes: PropTypes.string.isRequired,
  }),
  onNewAdmission: PropTypes.func.isRequired,
};

export default AdmissionCompleted;
