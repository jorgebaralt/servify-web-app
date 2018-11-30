import * as actionTypes from './types';

import smoothscroll from 'smoothscroll-polyfill';

const isMobile = () => {
    let isMobile = false;
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        smoothscroll.polyfill();
        isMobile = true;
    }
    return isMobile;
}

export const mobileActions = {
    isMobile: () => {
        return {
            type: actionTypes.IS_MOBILE_REDUCER,
            isMobile: isMobile()
        }
    }
}

export const mobileCreator = {
    isMobileInit: () => {
        return {
            type: actionTypes.MOBILE_SAGA_INIT
        }
    }
}