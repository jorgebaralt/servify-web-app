import * as actionTypes from './types';

export const authActions = {
    authInit: (userId) => {
        return {
            type: actionTypes.AUTH_INIT,
            userId: userId
        }
    },
    authSuccess: (userId, userEmail) => {
        return {
            type: actionTypes.AUTH_SUCCESS,
            userId: userId,
            userEmail: userEmail
        }
    },
    authFail: (error) => {
        return {
            type: actionTypes.AUTH_FAIL,
            error: error
        }
    },
    authLogout: () => {
        return {
            type: actionTypes.AUTH_LOGOUT
        }
    },
    authSetRedirectPath: (path) => {
        return {
            type: actionTypes.AUTH_SET_REDIRECT_PATH,
            path: path
        }
    },
    authResetRedirectPath: () => {
        return {
            type: actionTypes.AUTH_SET_REDIRECT_PATH,
            path: null
        }
    },
    authResetErrorMessage: () => {
        return {
            type: actionTypes.AUTH_RESET_ERROR_MESSAGE,
        }
    },
}

export const authCreator = {
    authCheckStateInit: () => {
        return {
            type: actionTypes.AUTH_INIT_SAGA
        }
    },
    authSignUpInit: (email, password, bRememberMe) => {
        return {
            type: actionTypes.AUTH_INIT_SIGN_UP,
            email: email,
            password: password,
            bRememberMe: bRememberMe
        }
    },
    authSignInInit: (email, password, bRememberMe) => {
        return {
            type: actionTypes.AUTH_INIT_SIGN_IN,
            email: email,
            password: password,
            bRememberMe: bRememberMe
        }
    },
    authLogoutInit: () => {
        return {
            type: actionTypes.AUTH_INIT_SAGA_LOGOUT
        }
    }
}