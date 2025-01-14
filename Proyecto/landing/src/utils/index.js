export const validateField = (validations, fieldName, value) => {
    const rules = validations[fieldName];
    if (!rules) return { isValid: true, message: "" };

    if (rules.required && !value) {
        return { isValid: false, message: `El campo ${rules.fieldName} es obligatorio.` };
    }

    if (rules.minLength && value.length < rules.minLength) {
        return { isValid: false, message: rules.message };
    }

    if (rules.pattern && !rules.pattern.test(value)) {
        return { isValid: false, message: rules.message };
    }

    return { isValid: true, message: "" };
};

export const validateForm = (formData) => {
    const errors = {};
    let isValid = true;

    Object.keys(formData).forEach((field) => {
        const validation = validateField(field, formData[field]);
        if (!validation.isValid) {
        isValid = false;
        errors[field] = validation.message;
        }
    });

    return { isValid, errors };
};
