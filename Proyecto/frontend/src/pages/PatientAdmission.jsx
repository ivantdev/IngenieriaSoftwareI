import { useEffect, useState } from "react";
import SearchPreRegistration from "@/components/Admission/SearchPreRegistration";
import ShowPatientData from "@/components/Admission/ShowPatientData";
import ResourcesAssign from "@/components/Admission/ResourcesAssign";
import AdmissionDetails from "@/components/Admission/AdmissionDetails";
import AdmissionCompleted from "@/components/Admission/AdmissionCompleted";
import useGlobalContext from "@/hooks/useGlobalContext";

import { getCSRFToken, fetchWithAuth } from "@/utils/";

function PatientAdmission() {
  const [step, setStep] = useState(0);
  const [preRegistrationData, setPreRegistrationData] = useState(null);
  const [admissionData, setAdmissionData] = useState(null);
  const { globalState, addToast, setUser } = useGlobalContext();

  const successSearchPreRegistration = (data) => {
    setPreRegistrationData(data);
    setStep(1);
  };

  const handleAdmissionDetails = (resources) => {
    setAdmissionData({
      pre_registration_id: preRegistrationData.id,
      ...resources,
    });
    setStep(3);
  };

  const handleAdmissionResources = (resources) => {
    setAdmissionData({
      ...admissionData,
      resource_usage: resources,
      admission_date: new Date().toISOString(),
    });
    setStep(4);
  };

  const resetAdmission = () => {
    setPreRegistrationData(null);
    setAdmissionData(null);
    setStep(0);
  };

  useEffect(() => {
    const postAdmission = async () => {
      try {
        const url = `${globalState.endpoint}/patient-admissions/`;
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCSRFToken(),
          },
          body: JSON.stringify(admissionData),
        };
        const response = await fetchWithAuth(url, options, setUser);

        if (!response.ok) {
          addToast(`Error al registrar la admisión`, "error");
          setStep(3);
          return;
        }

        const data = await response.json();
        if (data.status == "success") {
          addToast("Admisión registrada exitosamente", "success");
          setAdmissionData(data.data);
          setStep(5);
        } else {
          addToast(`Error al registrar la admisión: ${data.message}`, "error");
          setStep(3);
        }
      } catch (error) {
        addToast(`Error al registrar la admisión: ${error.message}`, "error");
        setStep(3);
      }
    };

    if (step == 4) {
      postAdmission();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, admissionData]);

  return (
    <div className="p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Admisión de pacientes</h1>
      {step == 0 && (
        <SearchPreRegistration
          key={0}
          onSuccess={successSearchPreRegistration}
        />
      )}
      {step == 1 && (
        <ShowPatientData
          key={1}
          patientData={preRegistrationData}
          onContinue={() => setStep(2)}
        />
      )}
      {step == 2 && (
        <AdmissionDetails key={2} onSubmit={handleAdmissionDetails} />
      )}
      {step == 3 && (
        <ResourcesAssign
          key={3}
          patientData={{
            id: "1234",
          }}
          onSubmit={handleAdmissionResources}
        />
      )}
      {step == 5 && (
        <AdmissionCompleted
          key={5}
          admissionData={admissionData}
          onNewAdmission={resetAdmission}
        />
      )}
    </div>
  );
}

export default PatientAdmission;
