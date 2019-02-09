import * as actionTypes from './types';
// Worker function
import { isMobile } from '../../shared/isMobile';
// Polyfill
import smoothscroll from 'smoothscroll-polyfill';

// Applies smoothscroll polyfill if on a mobile device.
if (isMobile()) {
    smoothscroll.polyfill();
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