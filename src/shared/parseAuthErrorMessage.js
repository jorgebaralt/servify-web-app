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
