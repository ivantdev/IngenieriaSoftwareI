import { useState } from "react";
import { Link } from "react-router-dom";
import useGlobalContext from "@/hooks/useGlobalContext";
import PropTypes from "prop-types";

function PatientAdmission({ onSuccess }) {
  const [filter, setFilter] = useState("id");
  const [filterValue, setFilterValue] = useState("");
  const { globalState, addToast } = useGlobalContext();

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  const handleNext = async () => {
    if (!filterValue) {
      addToast("El campo de Valor es inválido", "error");
      return;
    }

    try {
      const response = await fetch(
        `${globalState.endpoint}/pre-registration/?${filter}=${filterValue}`,
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();

      if (data.data.length === 0) {
        addToast("No se encontró ningún pre-registro", "error");
        return;
      }

      onSuccess(data.data[0]);
    } catch (error) {
      addToast(`Error al buscar pre-registro: ${error.message}`, "error");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Buscar pre-registro</h2>
      <p className="text-gray-700 mb-4">
        Si el paciente no llenó el pre-registro, use{" "}
        <Link
          to="/pre-registro-paciente"
          className="text-blue-500 hover:underline"
          target="_blank"
        >
          este enlace
        </Link>{" "}
        para registrar la información.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="filter"
            className="block text-sm font-medium text-gray-700"
          >
            Filtrar por:
          </label>
          <select
            id="filter"
            value={filter}
            onChange={handleFilterChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="id">Código de pre-registro</option>
            <option value="id_number">Número de identificación</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="filterValue"
            className="block text-sm font-medium text-gray-700"
          >
            Valor a filtrar
          </label>
          <input
            type="text"
            id="filterValue"
            value={filterValue}
            onChange={handleFilterValueChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="PRE-12341234"
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleNext}
          type="button"
          className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

PatientAdmission.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default PatientAdmission;
