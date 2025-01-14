import PropTypes from 'prop-types';
import { useToast } from '@/hooks/useToast';
import ToastContainer from "@/components/ToastContainer";
import { validateField } from '@/utils';

const validations = {
    first_name: {
        fieldName: "Nombres",
        required: true,
        minLength: 2,
        message: "El nombre debe tener al menos 2 caracteres.",
    },
    last_name: {
        fieldName: "Apellidos",
        required: true,
        minLength: 2,
        message: "El apellido debe tener al menos 2 caracteres.",
    },
    id_type: {
        fieldName: "Tipo de identificación",
        required: true,
        pattern: /^(CC|TI|PA|TE|CE)$/,
        message: "Seleccione un tipo de identificación válido.",
    },
    id_number: {
        fieldName: "Número de identificación",
        required: true,
        pattern: /^[0-9]{10}$/,
        message: "El número de identificación debe contener 10 números.",
    },
    email: {
        fieldName: "Correo electrónico",
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Debe ingresar un correo electrónico válido.",
    },
    contact_number: {
        fieldName: "Teléfono celular",
        required: true,
        pattern: /^\+?[0-9]{10,13}$/,
        message: "El número de teléfono debe ser válido.",
    },
    birth_date: {
        fieldName: "Fecha de nacimiento",
        required: true,
        pattern: /^\d{4}-\d{2}-\d{2}$/,
        message: "Debe ingresar una fecha válida (YYYY-MM-DD).",
    },
};

function PatientForm({ formData = { patient: {} }, updateFormData, nextStep }) {
    const { toasts, addToast, removeToast } = useToast();
    const clickButton = (e) => {
        e.preventDefault();

        const validationResults = [];
        let isValid = true;

        Object.keys(validations).forEach((field) => {
            const input = document.querySelector(`[name="${field}"]`);
            const value = input ? input.value : '';
            const validation = validateField(validations, field, value);

            if (!validation.isValid) {
                isValid = false;
                validationResults.push(validation.message);
            }
        });

        if (!isValid) {
            validationResults.forEach((message) => {
                addToast(
                    message,
                    {
                        type: 'error',
                    }
                );
            })
        } else {
            updateFormData({
                ...formData,
                patient: {
                    "first_name": document.querySelector('[name="first_name"]').value,
                    "last_name": document.querySelector('[name="last_name"]').value,
                    "id_type": document.querySelector('[name="id_type"]').value,
                    "id_number": document.querySelector('[name="id_number"]').value,
                    "birth_date": document.querySelector('[name="birth_date"]').value,
                    "contact_number": document.querySelector('[name="contact_number"]').value,
                    "email": document.querySelector('[name="email"]').value,
                },
                reason: document.querySelector('[name="reason"]').value,
                "medical_info": {
                    "allergies": document.querySelector('[name="allergies"]').value,
                    "preexisting_conditions": document.querySelector('[name="preexisting_conditions"]').value,
                },
            });
            nextStep();
        }
    };

    return (
        <form className="stepform__container">

            <ToastContainer toasts={toasts} removeToast={removeToast} />

            <div>
                <h2>Información personal del paciente</h2>
                <div className="field">
                    <label htmlFor="first_name">Nombres</label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        placeholder="Juan"
                        defaultValue={formData.patient.first_name || ''}
                    />
                </div>
                <div className="field">
                    <label htmlFor="last_name">Apellidos</label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        placeholder="Pérez"
                        defaultValue={formData.patient.last_name || ''}
                    />
                </div>
                <div className="field">
                    <label htmlFor="id_type">Tipo de identificación</label>
                    <select name="id_type" id="id_type" defaultValue={formData.patient.id_type || ''}>
                        <option value="CC">Cédula de ciudadanía</option>
                        <option value="TI">Tarjeta de identidad</option>
                        <option value="PA">Pasaporte</option>
                        <option value="TE">Tarjeta de extranjería</option>
                        <option value="CE">Cédula de extranjería</option>
                    </select>
                </div>
                <div className="field">
                    <label htmlFor="id_number">Número de identificación</label>
                    <input
                        type="text"
                        id="id_number"
                        name="id_number"
                        placeholder="1234567890"
                        defaultValue={formData.patient.id_number || ''}
                    />
                </div>
                <div className="field">
                    <label htmlFor="birth_date">Fecha de nacimiento</label>
                    <input
                        type="date"
                        id="birth_date"
                        name="birth_date"
                        defaultValue={formData.patient.birth_date || ''}
                        max={new Date().toISOString().split('T')[0]}
                    />
                </div>
                <div className="field">
                    <label htmlFor="contact_number">Teléfono celular</label>
                    <input
                        type="text"
                        id="contact_number"
                        name="contact_number"
                        placeholder="+57 313 456 7890"
                        defaultValue={formData.patient.contact_number || ''}
                    />
                </div>
                <div className="field">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="juanperez@gmail.com"
                        defaultValue={formData.patient.email || ''}
                    />
                </div>
            </div>
            <div>
                <h2>Información médica</h2>
                <div className="field grid1-3">
                    <label htmlFor="reason">Motivo de consulta</label>
                    <textarea
                        name="reason"
                        id="reason"
                        required
                        placeholder='Describa el motivo de su consulta'
                        defaultValue={formData.patient.reason || ''}
                    ></textarea>
                </div>
                <div className="field">
                    <label htmlFor="allergies">Alergias conocidas</label>
                    <textarea
                        name="allergies"
                        id="allergies"
                        placeholder='Polen Ácaros Gluten'
                        defaultValue={formData.patient.allergies || ''}
                    ></textarea>
                </div>
                <div className="field">
                    <label htmlFor="preexisting_conditions">Condiciones preexistentes</label>
                    <textarea
                        name="preexisting_conditions"
                        id="preexisting_conditions"
                        placeholder='Embarazo Cancer Diabetes'
                        defaultValue={formData.patient.preexisting_conditions || ''}
                    ></textarea>
                </div>
            </div>
            <button type="button" onClick={clickButton}>
                Siguiente
            </button>
        </form>
    );
}

PatientForm.propTypes = {
    formData: PropTypes.object,
    updateFormData: PropTypes.func,
    nextStep: PropTypes.func,
};

export default PatientForm;
