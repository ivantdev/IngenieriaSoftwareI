import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Steps from "@/components/Steps";
import PatientForm from "@/components/PatientForm";
import ThirdPartyForm from "@/components/ThirdPartyForm";
import PreRegistrationCompleted from "@/components/PreRegistrationCompleted";
import "@/styles/PreRegistration.css"

function PreRegistration() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ patient: {} });
    
    const nextStep = () => {
        setStep(step + 1);
    }
    
    const forms = [
        <PatientForm key="patient-form" formData={formData} updateFormData={setFormData} nextStep={nextStep} />,
        <ThirdPartyForm key="third-party-form" formData={formData} updateFormData={setFormData} nextStep={nextStep} />,
        <PreRegistrationCompleted key="pre-registration-completed" formData={formData} />
    ];

    useEffect(() => {
        if (step === 2) {
            console.log("Formulario completado", formData);

            // TODO: Send data to server, if fail return to step 1 else go to step 3
        }
    }, [step]);

    return (
        <>
            <Header />
            <main className="preregistration__main">
                <h1>Formulario de Pre-registro de paciente</h1>
                <div className="steps__container">
                    <Steps quantity={3} completed={step+1} current={step+1} />
                </div>
                <div className="form__container" action="">
                    {step < 3 ? forms[step] : forms[2] }
                </div>
            </main>
        </>
    )
}

export default PreRegistration;