import { useState, useEffect } from "react";
import useGlobalContext from "@/hooks/useGlobalContext";
import { fetchWithAuth, getCSRFToken } from "@/utils";

function NotificationsManagement() {
  const { globalState, addToast, setUser } = useGlobalContext();
  const [type, setType] = useState("email"); // email o telegram
  const [recipients, setRecipients] = useState([]); // Lista de IDs seleccionados
  const [users, setUsers] = useState([]); // Lista de usuarios disponibles
  const [title, setTitle] = useState(""); // Título / Asunto
  const [text, setText] = useState(""); // Mensaje
  const [step, setStep] = useState(0);
  const [notificationData, setNotificationData] = useState(null);

  // Obtener lista de usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchWithAuth(
          `${globalState.endpoint}/users/`,
          {},
          setUser,
        );
        const data = await response.json();
        if (data.status === "success") {
          setUsers(data.data);
        } else {
          addToast("Error al cargar usuarios", "error");
        }
      } catch {
        addToast("Error en la petición de usuarios", "error");
      }
    };
    fetchUsers();
  }, [globalState.endpoint, setUser, addToast]);

  // Enviar notificación
  useEffect(() => {
    const postNotification = async () => {
      if (!notificationData) return;
      try {
        console.log(
          "🔗 Enviando notificación a:",
          `${globalState.endpoint}/notifications/`,
        );
        const response = await fetchWithAuth(
          `${globalState.endpoint}/notifications/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": getCSRFToken(),
            },
            body: JSON.stringify(notificationData),
          },
          setUser,
        );

        const data = await response.json();
        if (!response.ok) {
          console.error("❌ Error en la respuesta:", data);
          addToast(data.message || "Error al enviar la notificación", "error");
          setStep(0);
          return;
        }

        addToast("✅ Notificación enviada exitosamente", "success");
        setStep(2);
      } catch (error) {
        console.error("❌ Error en la petición:", error);
        addToast("Ocurrió un error al enviar la notificación", "error");
        setStep(0);
      }
    };
    if (step === 1 && notificationData) {
      postNotification();
    }
  }, [step, notificationData, globalState.endpoint, setUser, addToast]);

  // Manejar selección de múltiples destinatarios y removerlos de la lista
  const handleRecipientsChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value,
    );
    setRecipients((prevRecipients) => [...prevRecipients, ...selectedOptions]);
  };

  // Manejar eliminación de destinatarios seleccionados y devolverlos a la lista
  const handleRemoveRecipient = (id) => {
    setRecipients((prevRecipients) => prevRecipients.filter((r) => r !== id));
  };

  const handleNotificationSubmission = (e) => {
    e.preventDefault();
    if (recipients.length === 0) {
      addToast("Selecciona al menos un destinatario", "error");
      return;
    }

    const selectedRecipients = recipients.map((id) => parseInt(id, 10));

    const newNotification = {
      recipients: selectedRecipients,
      channel: type, // email o telegram
      title,
      content: {
        text,
        ...(type === "email"
          ? { subject: title, html: `<p>${text}</p>` }
          : { parse_mode: "HTML" }),
      },
    };

    console.log(
      "📨 Datos de la notificación a enviar:",
      JSON.stringify(newNotification),
    );
    setNotificationData(newNotification);
    setStep(1);
  };

  // Filtrar usuarios que ya han sido seleccionados
  const availableUsers = users.filter(
    (user) =>
      !recipients.includes(user.id.toString()) &&
      (type === "email" ? user.email : user.telegram_id),
  );

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Gestión de Notificaciones</h1>

      {step === 0 && (
        <form onSubmit={handleNotificationSubmission} className="space-y-4">
          {/* Selector de Canal */}
          <div>
            <label className="block font-semibold">
              Canal de Notificación:
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-3 border rounded"
            >
              <option value="email">Email</option>
              <option value="telegram">Telegram</option>
            </select>
          </div>

          {/* Lista de Destinatarios */}
          <div>
            <label className="block font-semibold">Destinatarios:</label>
            <select
              multiple
              value={recipients}
              onChange={handleRecipientsChange}
              className="w-full p-3 border rounded"
            >
              {availableUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username} ({type === "email" ? "Email" : "Telegram"})
                </option>
              ))}
            </select>
          </div>

          {/* Lista de destinatarios seleccionados */}
          <div>
            <label className="block font-semibold">Seleccionados:</label>
            <div className="flex flex-wrap gap-2">
              {recipients.map((id) => {
                const user = users.find((u) => u.id.toString() === id);
                return user ? (
                  <div
                    key={id}
                    className="bg-gray-200 p-2 rounded flex items-center"
                  >
                    {user.username} ({type === "email" ? "Email" : "Telegram"})
                    <button
                      type="button"
                      className="ml-2 text-red-500"
                      onClick={() => handleRemoveRecipient(id)}
                    >
                      ✖
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          </div>

          {/* Campo de Asunto/Título */}
          <div>
            <label className="block font-semibold">Asunto:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded"
              required
            />
          </div>

          {/* Campo de Mensaje */}
          <div>
            <label className="block font-semibold">Mensaje:</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-3 border rounded"
              required
            />
          </div>

          {/* Botón de Envío */}
          <button
            type="submit"
            className="w-full bg-black text-white font-bold py-3 rounded"
          >
            Enviar Notificación
          </button>
        </form>
      )}

      {step === 1 && (
        <div className="text-center text-lg font-semibold text-gray-700">
          Enviando notificación...
        </div>
      )}
      {step === 2 && (
        <div className="text-center text-lg font-semibold text-green-600">
          Notificación enviada exitosamente
        </div>
      )}
    </div>
  );
}

export default NotificationsManagement;
