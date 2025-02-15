import useGlobalContext from "@/hooks/useGlobalContext";

function ToastContainer() {
  const { toasts } = useGlobalContext();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`p-4 rounded-xl shadow-lg bg-white ${
            toast.type === "error" ? "text-red-500" : "text-green-500"
          } font-semibold transition-opacity duration-300 ease-in-out`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}

export default ToastContainer;
