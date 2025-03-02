import { useState } from "react";
import PropTypes from "prop-types"; // 🔹 Importa PropTypes

function ConfirmEgressDetails({ onSubmit }) {
  const [reason, setReason] = useState("");

  const handleConfirm = (e) => {
    e.preventDefault();
    onSubmit({ reason, egress_date: new Date().toISOString() }); // Envía los datos
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Confirmar Salida</h2>
      <form className="space-y-4" onSubmit={handleConfirm}>
        <label className="block">
          <span className="text-gray-700">Motivo de salida</span>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            required
          />
        </label>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
        >
          Confirmar Salida
        </button>
      </form>
    </div>
  );
}

// 🔹 Agrega validación de PropTypes
ConfirmEgressDetails.propTypes = {
  onSubmit: PropTypes.func.isRequired, // Debe ser una función y es obligatoria
};

export default ConfirmEgressDetails;
