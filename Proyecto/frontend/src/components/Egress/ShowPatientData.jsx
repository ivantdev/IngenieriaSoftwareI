import PropTypes from "prop-types"; // 🔹 Importamos PropTypes

function ShowPatientData({ patientData, onContinue }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Datos del Paciente</h2>
      <p>
        <strong>Nombre:</strong> {patientData.name}
      </p>
      <p>
        <strong>Código de Admisión:</strong> {patientData.admission_code}
      </p>
      <p>
        <strong>Identificación:</strong> {patientData.id_number}
      </p>

      <button
        onClick={onContinue}
        className="w-full bg-green-600 text-white py-2 rounded-md mt-4 hover:bg-green-700"
      >
        Continuar con Salida
      </button>
    </div>
  );
}

// 🔹 Agregamos validación de PropTypes
ShowPatientData.propTypes = {
  patientData: PropTypes.shape({
    name: PropTypes.string.isRequired, // 🔹 Aseguramos que es un string obligatorio
    admission_code: PropTypes.string.isRequired,
    id_number: PropTypes.string.isRequired,
  }).isRequired,
  onContinue: PropTypes.func.isRequired, // 🔹 onContinue debe ser una función
};

export default ShowPatientData;
