export const isMobile = () => {
    let isMobile = false;
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        isMobile = true;
    }
    return isMobile;
}