import PropTypes from "prop-types";

function OpcionRecuperacion({ value, label, selected, onChange }) {
  return (
    <label className="opcion-recuperacion">
      <input
        type="radio"
        value={value}
        checked={selected === value}
        onChange={() => onChange(value)}
      />
      <span>{label}</span>
    </label>
  );
}

/* ✅ Validación de las props con PropTypes */
OpcionRecuperacion.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default OpcionRecuperacion;
