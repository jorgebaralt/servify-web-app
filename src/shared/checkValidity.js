export const checkValidity = (value, rules) => {
    let isValid = true;
    if (rules) {
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.email) {
            isValid = value.includes('@') && value.includes('.') && isValid;
        }
    }
    return isValid;
}