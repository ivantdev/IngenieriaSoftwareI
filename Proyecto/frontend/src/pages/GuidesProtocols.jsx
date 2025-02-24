import useGlobalContext from "@/hooks/useGlobalContext";
import Filter from "@/components/GuidesProtocols/Filter";
import ProtocolList from "@/components/GuidesProtocols/ProtocolList";
import { useEffect, useState } from "react";
import { fetchWithAuth } from "@/utils";

function GuidesProtocols() {
  const [specialtyList, setSpecialtyList] = useState([]);
  const [subSpecialty, setSubSpecialty] = useState(null);
  const { globalState, addToast } = useGlobalContext();

  useEffect(() => {
    const getSpecialties = async () => {
      try {
        const response = await fetchWithAuth(
          `${globalState.endpoint}/protocols/?sub_specialty=${subSpecialty}`,
          {},
          globalState.setUser,
        );
        const data = await response.json();
        if (data.status === "error") {
          addToast(data.message, "error");
          return;
        }
        addToast("Especialidades cargadas", "success");
        setSpecialtyList(data.data);
      } catch {
        addToast("Ocurrió un error al cargar las especialidades", "error");
      }
    };

    if (!subSpecialty) return;
    getSpecialties();
  }, [addToast, globalState.endpoint, globalState.setUser, subSpecialty]);

  return (
    <div className="p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Guías y Protocolos</h1>
      <div className="bg-white p-6 rounded-xl shadow">
        <Filter onClickButton={setSubSpecialty} />
        <ProtocolList protocols={specialtyList} />
      </div>
    </div>
  );
}

export default GuidesProtocols;
