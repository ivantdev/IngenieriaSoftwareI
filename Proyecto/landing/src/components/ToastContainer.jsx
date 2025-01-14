import PropTypes from "prop-types";

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div style={styles.container}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            ...styles.toast,
            ...toast.style,
            ...(toast.type === "success" && styles.success),
            ...(toast.type === "error" && styles.error),
            ...(toast.type === "warning" && styles.warning),
            ...(toast.type === "info" && styles.info),
          }}
          onClick={() => removeToast(toast.id)}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

ToastContainer.propTypes = {
  toasts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      duration: PropTypes.number,
      type: PropTypes.string,
      style: PropTypes.object,
    })
  ).isRequired,
  removeToast: PropTypes.func.isRequired,
};

const styles = {
  container: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  toast: {
    padding: "15px 40px",
    borderRadius: "15px",
    boxShadow: "0px 4px 20px 1px rgba(0, 0, 0, 0.1)",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "opacity 0.3s ease-in-out",
    opacity: 1,
  },
  success: { backgroundColor: "white" ,color: "#4caf50" },
  error: { backgroundColor: "white" ,color: "#f44336" },
  warning: { backgroundColor: "white" ,color: "#ff9800" },
  info: { backgroundColor: "white" ,color: "#2196f3" },
};

export default ToastContainer;
