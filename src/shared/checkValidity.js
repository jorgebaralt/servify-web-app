export const checkValidity = (value, rules) => {
    let isValid = true;
    if (rules) {
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
            if (!isValid) { return isValid; }
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
            if (!isValid) { return isValid; }
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
            if (!isValid) { return isValid; }
        }
        if (rules.number) {
            isValid = !isNaN(value);
            if (!isValid) { return isValid; }
        }
        if (rules.email) {
            isValid = value.includes('@') && value.includes('.') && isValid;
            if (!isValid) { return isValid; }
        }
    }
    return isValid;
}