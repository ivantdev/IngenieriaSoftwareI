import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useToast } from "@/hooks/useToast";
import ToastContainer from "@/components/ToastContainer";

function PreRegistrationCompleted({ formData }) {
  const [isReady, setIsReady] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  useEffect(() => {
    if (formData?.status !== "success") {
      addToast("Error al cargar la información del pre-registro", {
        type: "error",
      });
    } else {
      setIsReady(true);
    }
  }, [formData, addToast]);

  if (!isReady) {
    return (
      <div className="stepform__container">
        <h3>Cargando información...</h3>
      </div>
    );
  }

  return (
    <div className="stepform__container competed__form">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <div>
        <h2>
          Referencia de pre-registro:{" "}
          <span className="bold">{formData.data.reference_code}</span>
        </h2>
        <div className="completed__form-image">
          <img src={formData.data.qr_code} alt="Código QR escaneable" />
        </div>
      </div>
      <div>
        <h3>Información personal del paciente</h3>
        <div>
          <span>Nombre completo:</span>
          <span>{`${formData.data.patient.first_name} ${formData.data.patient.last_name}`}</span>
        </div>
        <div>
          <span>Tipo de identificación:</span>
          <span>{formData.data.patient.id_type}</span>
        </div>
        <div>
          <span>Número de identificación:</span>
          <span>{formData.data.patient.id_number}</span>
        </div>
        <div>
          <span>Fecha de nacimiento:</span>
          <span>{formData.data.patient.birth_date}</span>
        </div>
        <div>
          <span>Teléfono celular:</span>
          <span>{formData.data.patient.contact_number}</span>
        </div>
        <div>
          <span>Correo electrónico:</span>
          <span>{formData.data.patient.email}</span>
        </div>
      </div>
      <div>
        <h3>Información médica del paciente</h3>
        <div>
          <span>Motivo de consulta:</span>
          <span>{formData.data.medical_info.reason}</span>
        </div>
        <div>
          <span>Alergias conocidas:</span>
          <span>{formData.data.medical_info.allergies}</span>
        </div>
        <div>
          <span>Condiciones preexistentes:</span>
          <span>{formData.data.medical_info.preexisting_conditions}</span>
        </div>
      </div>
    </div>
  );
}

PreRegistrationCompleted.propTypes = {
  formData: PropTypes.shape({
    status: PropTypes.string,
    data: PropTypes.shape({
      id: PropTypes.number,
      reference_code: PropTypes.string,
      qr_code: PropTypes.string,
      patient: PropTypes.shape({
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        birth_date: PropTypes.string,
        id_type: PropTypes.string,
        id_number: PropTypes.string,
        contact_number: PropTypes.string,
        email: PropTypes.string,
      }),
      medical_info: PropTypes.shape({
        reason: PropTypes.string,
        allergies: PropTypes.string,
        preexisting_conditions: PropTypes.string,
      }),
      third_party: PropTypes.shape({
        relationship: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        contact_number: PropTypes.string,
        email: PropTypes.string,
      }),
    }),
  }),
};

export default PreRegistrationCompleted;
