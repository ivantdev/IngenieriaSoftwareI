import PropTypes from 'prop-types';
import { useState } from 'react';
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

};

function ThirdPartyForm({ formData = { patient: {} }, updateFormData, nextStep }) {
    const [isThirdParty, setIsThirdParty] = useState(true);

    const clickButton = (e) => {
        e.preventDefault();

        const validationResults = {};
        let isValid = true;

        const is_third_party = document.querySelector('[name="is_third_party"]').checked;

        if (is_third_party) {
            Object.keys(validations).forEach((field) => {
                const input = document.querySelector(`[name="${field}"]`);
                const value = input ? input.value : '';
                const validation = validateField(validations, field, value);
                console.log("Validación de", field, validation);
    
                if (!validation.isValid) {
                    isValid = false;
                    validationResults[field] = validation.message;
                }
            });
        }


        if (!isValid) {
            console.log("Errores de validación:", validationResults);
        } else {
            updateFormData({
                ...formData,
                third_party: {

                }
            });
            nextStep();
        }
    };

    return (
        <form className="stepform__container">
            <div>
                <div className='field checkbox'>
                    <input
                        type="checkbox"
                        name="is_third_party"
                        id="is_third_party"
                        onChange={() => setIsThirdParty(!isThirdParty)}
                    />
                    <label htmlFor="is_third_party">¿Es usted un acopañante o tutor legal del paciente?</label>
                </div>
            </div>
            {
                !isThirdParty &&
                <div>
                    <h2>Información del acompañante o tutor legal</h2>
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
                    <div className="field">
                        <label htmlFor="relationship">Tipo de identificación</label>
                        <select name="relationship" id="relationship" required>
                            <option value="">Seleccione una opción</option>
                            <option value="parent">Padre/Madre</option>
                            <option value="sibling">Hermano(a)</option>
                            <option value="child">Hijo(a)</option>
                            <option value="grandparent">Abuelo(a)</option>
                            <option value="other_family">Otro familiar</option>
                            <option value="legal_guardian">Tutor legal</option>
                            <option value="caregiver">Cuidador</option>
                            <option value="health_professional">Profesional de la salud</option>
                            <option value="friend">Amigo(a)</option>
                            <option value="neighbor">Vecino(a)</option>
                            <option value="no_relationship">Sin relación</option>
                            <option value="other">Otro</option>
                        </select>
                    </div>
                </div>
            }
            <button type="button" onClick={clickButton}>
                Terminar
            </button>
        </form>
    );
}

ThirdPartyForm.propTypes = {
    formData: PropTypes.object,
    updateFormData: PropTypes.func,
    nextStep: PropTypes.func,
};

export default ThirdPartyForm;
