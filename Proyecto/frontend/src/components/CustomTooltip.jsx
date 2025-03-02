import PropTypes from "prop-types";

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    const formattedDate = new Date(data.created_at).toLocaleString("es-ES", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    return (
      <div className="bg-white p-2 rounded shadow-md text-sm">
        <p className="font-semibold">{formattedDate}</p>
        <p className="text-blue-600">
          Ocupación: <strong>{data.occupancy_percentage.toFixed(2)}%</strong>
        </p>
      </div>
    );
  }
  return null;
}

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        created_at: PropTypes.string.isRequired,
        occupancy_percentage: PropTypes.number.isRequired,
      }).isRequired,
    }),
  ),
};

export default CustomTooltip;
