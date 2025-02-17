import PropTypes from "prop-types";

function ShowPatientData({ patientData, onContinue }) {
  if (!patientData) {
    return <div>No hay datos del paciente.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Información del paciente</h2>

      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-col gap-4">
          <h3 className="font-bold">Información personal</h3>
          <p>
            <span className="font-medium">Nombre completo:</span>{" "}
            {patientData.patient.first_name} {patientData.patient.last_name}
          </p>
          <p>
            <span className="font-medium">Tipo de identificación:</span>{" "}
            {patientData.patient.id_type}
          </p>
          <p>
            <span className="font-medium">Número de identificación:</span>{" "}
            {patientData.patient.id_number}
          </p>
          <p>
            <span className="font-medium">Fecha de nacimiento:</span>{" "}
            {patientData.patient.birth_date}
          </p>
          <p>
            <span className="font-medium">Teléfono celular:</span>{" "}
            {patientData.patient.contact_number}
          </p>
          <p>
            <span className="font-medium">Correo electrónico:</span>{" "}
            {patientData.patient.email}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold">Información médica</h3>
          <p>
            <span className="font-medium">Motivo de consulta:</span>{" "}
            {patientData.medical_info.reason}
          </p>
          <p>
            <span className="font-medium">Alergias conocidas:</span>{" "}
            {patientData.medical_info.allergies}
          </p>
          <p>
            <span className="font-medium">Condiciones preexistentes:</span>{" "}
            {patientData.medical_info.preexisting_conditions}
          </p>
        </div>
        {patientData.third_party && (
          <div className="flex flex-col gap-4">
            <h3 className="font-bold">Tutor/Acompañante</h3>
            <p>
              <span className="font-medium">Nombre completo:</span>{" "}
              {patientData.third_party.first_name}{" "}
              {patientData.third_party.last_name}
            </p>
            <p>
              <span className="font-medium">Teléfono:</span>{" "}
              {patientData.third_party.contact_number}
            </p>
            <p>
              <span className="font-medium">Correo electrónico:</span>{" "}
              {patientData.third_party.email}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={onContinue}
          className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}

ShowPatientData.propTypes = {
  patientData: PropTypes.shape({
    patient: PropTypes.shape({
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      id_type: PropTypes.string.isRequired,
      id_number: PropTypes.string.isRequired,
      birth_date: PropTypes.string.isRequired,
      contact_number: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
    medical_info: PropTypes.shape({
      reason: PropTypes.string.isRequired,
      allergies: PropTypes.string.isRequired,
      preexisting_conditions: PropTypes.string.isRequired,
    }).isRequired,
    third_party: PropTypes.shape({
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      contact_number: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
  }),
  onContinue: PropTypes.func.isRequired,
};

export default ShowPatientData;
