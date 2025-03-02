import { useEffect, useState } from "react";
import useGlobalContext from "@/hooks/useGlobalContext";
import CustomTooltip from "@/components/CustomTooltip";
import { fetchWithAuth } from "@/utils/";
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  ResponsiveContainer,
  Legend,
} from "recharts";

import PropTypes from "prop-types";
function OccupancyChart({ resource_name, data }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2">
        Ocupación de {resource_name}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient
              id={`color${resource_name}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis
            className="text-sm"
            axisLine={true}
            tick={false}
            tickLine={false}
          />
          <YAxis
            dataKey="occupancy_percentage"
            className="text-sm"
            axisLine={true}
            tickLine={false}
            domain={[0, 100]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="occupancy_percentage"
            stroke="#2563eb"
            fill={`url(#color${resource_name})`}
            fillOpacity={1}
            name={`Porcentaje de ocupación de ${resource_name}`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

OccupancyChart.propTypes = {
  resource_name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default function Stats() {
  const { globalState, addToast } = useGlobalContext();
  const [systemData, setSystemData] = useState(null);
  const [timeRange, setTimeRange] = useState("7h"); // Default to 7 hours

  useEffect(() => {
    const fetchDashboardData = async () => {
      const response = await fetchWithAuth(
        `${globalState.endpoint}/system-statistics/?period=${timeRange}`,
      );
      const data = await response.json();
      if (data.status === "success") {
        setSystemData(data.data);
      } else {
        addToast(data.message, "error");
      }
    };
    fetchDashboardData();
  }, [addToast, globalState.endpoint, setSystemData, timeRange]);

  if (!systemData) return null;
  return (
    <div className="p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 ">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold">Usuarios</h3>
          <p>Total: {systemData.users.total}</p>
          <p>Activos: {systemData.users.active}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold">Pre registros</h3>
          <p>Total: {systemData.pre_registrations.total}</p>
          {Object.entries(systemData.pre_registrations.by_status).map(
            ([key, value]) => (
              <p key={key} className="capitalize">
                {key.split("_").join(" ")}: {value}
              </p>
            ),
          )}
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold">Admisión de pacientes</h3>
          <p>Total: {systemData.admissions.total}</p>
          <p>Pending: {systemData.admissions.pending}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold">Notificaciones</h3>
          <p>Total: {systemData.notifications.total}</p>
          {Object.entries(systemData.notifications.by_status).map(
            ([key, value]) => (
              <p key={key} className="capitalize">
                {key.split("_").join(" ")}: {value}
              </p>
            ),
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <h2 className="text-2xl font-bold mb-2 sm:mb-0 sm:mr-4">
          Nivel de ocupación de los recursos
        </h2>
        <div className="flex sm:flex-row gap-2">
          {["7h", "24h", "7d", "30d"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 h-min rounded ${
                timeRange === range
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {systemData.resource_types.map((resource) => (
          <OccupancyChart
            key={resource.id}
            resource_name={resource.resource_name}
            data={systemData.occupancy_history.filter(
              (item) => item.resource_type.id == resource.id,
            )}
          />
        ))}
      </div>
    </div>
  );
}
