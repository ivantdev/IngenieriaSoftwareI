import { useState, useCallback } from "react";

const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info") => {
    const id = crypto.randomUUID();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 5000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
};

export default useToast;
