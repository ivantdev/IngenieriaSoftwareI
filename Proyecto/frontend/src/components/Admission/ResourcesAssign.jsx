import { useEffect, useState } from "react";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import PropTypes from "prop-types";

function ResourcesAssign({ onSubmit }) {
  const [resourceTypes, setResourceTypes] = useState([]);
  const [resources, setResources] = useState([]); // Resources assigned to the patient
  const { globalState, addToast } = useGlobalContext();

  const handleResourceChange = (index, field, value) => {
    const newResources = [...resources];
    newResources[index] = {
      ...newResources[index],
      [field]: Number.parseInt(value),
    };
    setResources(newResources);
  };

  const handleAddResource = () => {
    setResources([
      ...resources,
      { resource_type_id: "", resource_quantity: "" },
    ]);
  };

  const handleRemoveResource = (index) => {
    const newResources = resources.filter((_, i) => i !== index);
    setResources(newResources);
  };

  const handleSubmit = () => {
    let valid = true;
    resources.forEach((resource) => {
      if (!resource.resource_type_id || !resource.resource_quantity) {
        addToast("Por favor, complete todos los campos", "error");
        valid = false;
      }
    });
    if (!valid) return;
    onSubmit(resources);
  };

  useEffect(() => {
    const fetchResourceTypes = async () => {
      try {
        const response = await fetch(
          `${globalState.endpoint}/resource-types/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );

        if (!response.ok) {
          addToast(`Error al cargar los recursos`, "error");
          return;
        }

        const data = await response.json();
        if (data.status === "success") {
          setResourceTypes(data.data);
        } else {
          addToast(`Error al cargar los recursos: ${data.message}`, "error");
        }
      } catch (error) {
        addToast(`Error al cargar los recursos: ${error.message}`, "error");
      }
    };

    fetchResourceTypes();
  }, [addToast, globalState.endpoint]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Asignación de recursos</h2>

      {resources.map((resource, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-center"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipo de recurso
            </label>
            <select
              value={resource.type}
              onChange={(e) =>
                handleResourceChange(index, "resource_type_id", e.target.value)
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Seleccione un recurso</option>
              {resourceTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.resource_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cantidad
            </label>
            <input
              type="number"
              value={resource.resource_quantity}
              min={1}
              max={10}
              onChange={(e) =>
                handleResourceChange(index, "resource_quantity", e.target.value)
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <button
              type="button"
              onClick={() => handleRemoveResource(index)}
              className="mt-6 w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}

      <div className="mt-6">
        <button
          type="button"
          onClick={handleAddResource}
          className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        >
          + Agregar recurso
        </button>
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        >
          Terminar
        </button>
      </div>
    </div>
  );
}

ResourcesAssign.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ResourcesAssign;
