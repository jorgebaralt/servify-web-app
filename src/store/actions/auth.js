import * as actionTypes from './types';

export const authActions = {
    authInit: (userId) => {
        return {
            type: actionTypes.AUTH_INIT,
            userId: userId
        }
    },
    authSuccess: (userId, userEmail, userDetails) => {
        return {
            type: actionTypes.AUTH_SUCCESS,
            userId: userId,
            userEmail: userEmail,
            userDetails: userDetails
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
    authUpdateUserDetails: (userDetails) => {
        return {
            type: actionTypes.AUTH_UPDATE_USER_DETAILS,
            userDetails: userDetails
        }
    },
}

export const authCreator = {
    authCheckStateInit: () => {
        return {
            type: actionTypes.AUTH_INIT_SAGA
        }
    },
    authSignUpInit: (email, password, bRememberMe, displayName) => {
        return {
            type: actionTypes.AUTH_INIT_SIGN_UP,
            email: email,
            password: password,
            bRememberMe: bRememberMe,
            displayName: displayName
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
    authFacebook: {
        signInInit: (bRememberMe) => {
            return {
                type: actionTypes.AUTH_INIT_FACEBOOK_SIGN_IN,
                bRememberMe: bRememberMe
            }
        },
        signUpInit: (bRememberMe) => {
            return {
                type: actionTypes.AUTH_INIT_FACEBOOK_SIGN_UP,
                bRememberMe: bRememberMe
            }
        },
    },
    authGoogle: {
        signInInit: (bRememberMe) => {
            return {
                type: actionTypes.AUTH_INIT_GOOGLE_SIGN_IN,
                bRememberMe: bRememberMe
            }
        },
        signUpInit: (bRememberMe) => {
            return {
                type: actionTypes.AUTH_INIT_GOOGLE_SIGN_UP,
                bRememberMe: bRememberMe
            }
        },
    },
    authResetPasswordInit: (email) => {
        return {
            type: actionTypes.AUTH_INIT_RESET_PASSWORD,
            email: email
        }
    },
    authSaveUserToDatabaseInit: (user, signUpProvider, bWantToMerge) => {
        return {
            type: actionTypes.AUTH_INIT_SAVE_USER_TO_DATABASE,
            user: user,
            signUpProvider : signUpProvider,
            bWantToMerge: bWantToMerge

        }
    },
    authLogoutInit: () => {
        return {
            type: actionTypes.AUTH_INIT_SAGA_LOGOUT
        }
    }
}