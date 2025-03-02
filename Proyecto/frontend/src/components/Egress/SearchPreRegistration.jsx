import { useState } from "react";
import PropTypes from "prop-types";

function SearchPreRegistration({ onSuccess }) {
  const [searchType, setSearchType] = useState("id_number");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/patients/?${searchType}=${searchValue}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (response.ok && data.data.length > 0) {
        onSuccess(data.data[0]); // Enviar el primer paciente encontrado
      } else {
        alert("Paciente no encontrado");
      }
    } catch (error) {
      console.error("Error al buscar el paciente:", error);
      alert("Hubo un error en la búsqueda");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Buscar Paciente</h2>
      <form className="space-y-4" onSubmit={handleSearch}>
        <div className="flex gap-4">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="id_number">Número de identificación</option>
            <option value="first_name">Nombre</option>
            <option value="last_name">Apellido</option>
          </select>

          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Ingrese el valor"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Buscando..." : "Buscar Paciente"}
        </button>
      </form>
    </div>
  );
}

SearchPreRegistration.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default SearchPreRegistration;
