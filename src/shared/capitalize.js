import isString from './isString';

const capitalize = (string) => {
    if (!isString(string)) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default capitalize;