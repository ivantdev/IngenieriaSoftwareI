import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useGlobalContext from "@/hooks/useGlobalContext";
import { fetchWithAuth } from "@/utils/";
import { Search } from "lucide-react";

function Filter({ onClickButton }) {
  const { globalState, addToast, setUser } = useGlobalContext();
  const [specialtyList, setSpecialtyList] = useState([]);
  const [specialty, setSpecialty] = useState(null);
  const [subSpecialty, setSubSpecialty] = useState(null);

  const getSpecialties = async () => {
    try {
      const response = await fetchWithAuth(
        `${globalState.endpoint}/protocol-specialties/`,
        {},
        setUser,
      );
      const data = await response.json();
      setSpecialtyList(data.data);
    } catch {
      addToast("Ocurrió un error al cargar las especialidades", "error");
    }
  };

  useEffect(() => {
    getSpecialties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="flex-1">
        <label
          htmlFor="specialty"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Especialidad
        </label>
        <select
          name="specialty"
          id="specialty"
          onChange={(e) => setSpecialty(Number.parseInt(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
        >
          <option value="">Seleccione una opción</option>
          {specialtyList.map((specialtyItem) => (
            <option key={specialtyItem.id} value={specialtyItem.id}>
              {specialtyItem.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label
          htmlFor="sub-specialty"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Subespecialidad
        </label>
        <select
          name="sub-specialty"
          id="sub-specialty"
          onChange={(e) => setSubSpecialty(Number.parseInt(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
        >
          <option value="">Seleccione una opción</option>
          {specialtyList
            .find((item) => item.id === specialty)
            ?.sub_specialties.map((subSpecialtyItem) => (
              <option key={subSpecialtyItem.id} value={subSpecialtyItem.id}>
                {subSpecialtyItem.name}
              </option>
            ))}
        </select>
      </div>

      <div className="flex items-end">
        <button
          className="p-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          onClick={() => onClickButton(subSpecialty)}
        >
          <Search size="1.5em" />
        </button>
      </div>
    </div>
  );
}

Filter.propTypes = {
  onClickButton: PropTypes.func.isRequired,
};

export default Filter;
