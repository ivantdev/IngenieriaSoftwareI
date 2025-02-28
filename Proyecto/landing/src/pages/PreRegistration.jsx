import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Steps from "@/components/Steps";
import PatientForm from "@/components/PatientForm";
import ThirdPartyForm from "@/components/ThirdPartyForm";
import PreRegistrationCompleted from "@/components/PreRegistrationCompleted";
import { useToast } from "@/hooks/useToast";
import ToastContainer from "@/components/ToastContainer";
import "@/styles/PreRegistration.css";

function PreRegistration() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    patient: {},
    medical_info: {},
    third_party: {},
  });
  const { toasts, addToast, removeToast } = useToast();
  const endpoint = import.meta.env.VITE_API_ENDPOINT;

  const nextStep = () => {
    setStep(step + 1);
  };

  const forms = [
    <PatientForm
      key="patient-form"
      formData={formData}
      updateFormData={setFormData}
      nextStep={nextStep}
    />,
    <ThirdPartyForm
      key="third-party-form"
      formData={formData}
      updateFormData={setFormData}
      nextStep={nextStep}
    />,
    <PreRegistrationCompleted
      key="pre-registration-completed"
      formData={formData}
    />,
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        if (step === 2) {
          const result = await fetch(`${endpoint}/pre-registration/`, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(formData),
          });

          if (!result.ok) {
            setStep(1);
            addToast(
              "Ha ocurrido un error inesperado. Por favor, intente nuevamente.",
              {
                type: "error",
              },
            );
            return;
          }

          const jsonResponse = await result.json();
          setFormData(jsonResponse);
        }
      } catch {
        setStep(0);
        addToast(
          "Ha ocurrido un error inesperado. Por favor, intente nuevamente.",
          {
            type: "error",
          },
        );
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <Header />
      <main className="preregistration__main">
        <h1>Formulario de Pre-registro de paciente</h1>
        <div className="steps__container">
          <Steps quantity={3} completed={step + 1} current={step + 1} />
        </div>
        <div className="form__container" action="">
          {step < 2 ? forms[step] : forms[2]}
        </div>
      </main>
    </>
  );
}

export default PreRegistration;
