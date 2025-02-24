import PropTypes from "prop-types";
import { FileText } from "lucide-react";

const ProtocolList = ({ protocols }) => {
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className="space-y-4 p-4">
      {protocols.map((protocol) => (
        <div
          key={protocol.id}
          className="p-4 rounded-lg shadow-xl flex flex-col md:flex-row md:items-center h-auto"
        >
          <div className="flex-1">
            <h3 className="text-lg font-bold">{protocol.name}</h3>
            <p className="text-gray-700 line-clamp-2">
              {truncateText(protocol.description, 150)}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Subespecialidad: {protocol.sub_specialty.name}
            </p>
          </div>
          <div className="mt-4 md:mt-0 md:ml-6 flex items-center">
            {protocol.file ? (
              <>
                <FileText className="text-black-500 w-8 h-8 mr-2" />
                <button
                  onClick={() => window.open(protocol.file, "_blank")}
                  className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700"
                >
                  Abrir Archivo
                </button>
              </>
            ) : (
              <span className="text-gray-400">Sin archivo</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

ProtocolList.propTypes = {
  protocols: PropTypes.array.isRequired,
};

export default ProtocolList;
