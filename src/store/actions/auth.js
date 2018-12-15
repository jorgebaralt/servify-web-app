import * as actionTypes from './types';

const switchAuthModeHandler = (mode) => {
    return mode;
}

export const authActions = {
    switchAuthModeHandler: () => {
        return {
            type: actionTypes.AUTH_MODE_HANDLER,
            authMode: switchAuthModeHandler()
        }
    }
}

export const mobileCreator = {
    AuthInit: () => {
        return {
            type: actionTypes.AUTH_SAGA_INIT
        }
    }
}