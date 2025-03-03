import { useState, useCallback } from "react";

const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (message, type = "info") => {
      const id = crypto.randomUUID();
      setToasts((prevToasts) => [...prevToasts, { id, message, type }]);

      setTimeout(() => {
        removeToast(id);
      }, 5000);
    },
    [removeToast],
  ); // ✅ Se agrega removeToast a las dependencias

  return { toasts, addToast, removeToast };
};

export default useToast;
