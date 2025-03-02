import PropTypes from "prop-types";

function EgressCompleted({ egressData, onNewEgress }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Salida Registrada</h2>
      <p>
        <strong>Fecha de salida:</strong> {""}
        {new Date(egressData.egress_date).toLocaleString()}
      </p>
      <p>
        <strong>Motivo:</strong> {egressData.reason}
      </p>

      <button
        onClick={onNewEgress}
        className="w-full bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-700"
      >
        Registrar otra Salida
      </button>
    </div>
  );
}

// 🔹 Agregamos validación de props con PropTypes
EgressCompleted.propTypes = {
  egressData: PropTypes.shape({
    egress_date: PropTypes.string.isRequired, // Aseguramos que es un string obligatorio
    reason: PropTypes.string.isRequired,
  }).isRequired,
  onNewEgress: PropTypes.func.isRequired, // Debe ser una función y es obligatoria
};

export default EgressCompleted;
