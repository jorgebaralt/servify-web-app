import * as actionTypes from './types';

export const authActions = {
    authSuccess: (userId) => {
        return {
            type: actionTypes.AUTH_SUCCESS,
            userId: userId
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
    // ,checkAuthTimeout: (expirationTime) => {
    //     return {
    //         type: actionTypes.AUTH_CHECK_TIMEOUT,
    //         expirationTime: expirationTime
    //     }
    // },
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

export const parseErrorMessage = (isSignUp, errorCode) => {
    let errorMessage = null;
    if (isSignUp) {
        switch(errorCode) {
            case 'auth/email-already-in-use':
                errorMessage = 'The email address is already in use by another account.'
                break;
            case 'auth/invalid-email':
                errorMessage = 'The entered email address is not valid.'
                break;
            case 'auth/operation-not-allowed':
                errorMessage = 'Password sign-in is disabled for this website.'
                break;
            default:
            // do nothing
        }
    } else {
        switch(errorCode) {
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.'
                break;
            case 'auth/wrong-password':
                errorMessage = 'The password is invalid or the user does not have a password.'
                break;
            case 'USER_DISABLED':
                errorMessage = 'The user account has been disabled by an administrator.'
                break;
            default:
            // do nothing
        }
    }
    return errorMessage;
}
