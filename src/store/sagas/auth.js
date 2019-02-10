// Redux Saga
import { put, call, delay } from 'redux-saga/effects';
// Firebase methods
import firebase from 'firebase';
// Actions
import { authActions, authCreator } from '../actions';

export const authSagas = {
    authCheckState: function* () {
        let expirationDate = new Date(localStorage.getItem('expirationDate')); // Expiration date from local storage,
        const bIsExpired = expirationDate ? (new Date() >= expirationDate) : null;
        /**
         * If the token has expired, then set the user as null in local storage,
         * set the initial state userId as null and logout from Firebase and return.
         */
        if (bIsExpired) {
            yield localStorage.setItem('userId', null);
            yield put(authActions.authInit(null));
            yield put(authActions.authLogout());
            return;
        }
        /**
         * If the token has not expired or it's null, then set a new expiration date if it exists,
         * set the initial userId equal to the one from the localStorage, then try to run the
         * Firebase authentication to log the user in. If there is an error then run authLogout().
         */
        if (expirationDate) {
            expirationDate = yield new Date(new Date().getTime() + oneDayInMilliseconds); 
        }
        yield localStorage.setItem('expirationDate', expirationDate);
        const userId = localStorage.getItem('userId');
        yield put(authActions.authInit(userId));
        try {
            const currentUser = yield call(onAuthStateChanged); //Firebase promise
            if (!currentUser.uid || bIsExpired) {
                yield put(authActions.authLogout()); // If no user or rejected promise, logout & set auth loading state to false.
            } else {
                // Saving user to the database
                yield put(authCreator.authSaveUserToDatabaseInit(currentUser, false, true));
                yield put(authActions.authSuccess(currentUser.uid, currentUser.email, currentUser));
            }
        } catch (error) {
            yield put(authActions.authLogout()); // If no user or rejected promise, logout & set auth loading state to false.
        }
    },
    authSignUp: function* (action) {
        try {
            yield firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
            const response = yield firebase.auth().createUserWithEmailAndPassword(action.email, action.password);
            // Saving user display name (e.g.: Robert Molina, first name - last name) and defining an editable user object
            const displayName = action.displayName;
            yield response.user.updateProfile({ displayName: displayName });
            const user = yield { ...response.user };
            user.displayName = displayName;
            // Saving user to the database
            yield put(authCreator.authSaveUserToDatabaseInit(user, 'password', true));
            if (!action.bRememberMe) {
                /**
                 * If the checkbox is not checked, then create a new date token to
                 * check for expiracy date on start up.
                 */
                const expirationDate = yield new Date(new Date().getTime() + oneDayInMilliseconds); 
                yield localStorage.setItem('expirationDate', expirationDate);
            } else {
                /**
                 * If the checkbox is checked, then set the date token as null to 
                 * avoid checking for expiracy date on start up.
                 */
                yield localStorage.setItem('expirationDate', null);
            }
            yield localStorage.setItem('userId', response.user.uid);
            yield put(authActions.authSuccess(response.user.uid, response.user.email, response.user));
            yield put(authActions.authResetRedirectPath());
        } catch (error) {
            yield put(authActions.authFail(error.message));
        }
    },
    authSignIn: function* (action) {
        try {
            yield firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
            const response = yield firebase.auth().signInWithEmailAndPassword(action.email, action.password);
            // Saving user to the database
            yield put(authCreator.authSaveUserToDatabaseInit(response.user, false, true));
            if (!action.bRememberMe) {
                /**
                 * If the checkbox is not checked, then create a new date token to
                 * check for expiracy date on start up.
                 */
                const expirationDate = yield new Date(new Date().getTime() + oneDayInMilliseconds); 
                yield localStorage.setItem('expirationDate', expirationDate);
            } else {
                /**
                 * If the checkbox is checked, then set the date token as null to 
                 * avoid checking for expiracy date on start up.
                 */
                yield localStorage.setItem('expirationDate', null);
            }
            yield localStorage.setItem('userId', response.user.uid);
            yield put(authActions.authSuccess(response.user.uid, response.user.email, response.user));
            // Sending email verification if the user is not verified.
            if (!response.user.emailVerified) {
                const currentUser = yield firebase.auth().currentUser
                yield currentUser.sendEmailVerification();
            }
            yield put(authActions.authResetRedirectPath());
        } catch (error) {
            yield put(authActions.authFail(error.message));
        }
    },
    authFacebook: {
        signUp: function* (action) {
            const provider = yield new firebase.auth.FacebookAuthProvider();
            try {
                const response = yield firebase.auth().signInWithPopup(provider);
                // The signed-in user info.
                const user = yield response.user;
                // Saving user to the database
                yield put(authCreator.authSaveUserToDatabaseInit(user, 'facebook.com', true));
                if (!action.bRememberMe) {
                    /**
                     * If the checkbox is not checked, then create a new date token to
                     * check for expiracy date on start up.
                     */
                    const expirationDate = yield new Date(new Date().getTime() + oneDayInMilliseconds); 
                    yield localStorage.setItem('expirationDate', expirationDate);
                } else {
                    /**
                     * If the checkbox is checked, then set the date token as null to 
                     * avoid checking for expiracy date on start up.
                     */
                    yield localStorage.setItem('expirationDate', null);
                }
                yield localStorage.setItem('userId', user.uid);
                yield put(authActions.authSuccess(user.uid, user.email, user));
                // Sending email verification if the user is not verified.
                if (!user.emailVerified) {
                    const currentUser = yield firebase.auth().currentUser
                    yield currentUser.sendEmailVerification();
                }
                yield put(authActions.authResetRedirectPath());
            } catch (error) {
                put(authActions.authFail(error.message));
            }
        },
        signIn: function* (action) {
            const provider = yield new firebase.auth.FacebookAuthProvider();
            try {
                const response = yield firebase.auth().signInWithPopup(provider);
                // The signed-in user info.
                const user = yield response.user;
                // Saving user to the database
                yield put(authCreator.authSaveUserToDatabaseInit(user, false, true));
                if (!action.bRememberMe) {
                    /**
                     * If the checkbox is not checked, then create a new date token to
                     * check for expiracy date on start up.
                     */
                    const expirationDate = yield new Date(new Date().getTime() + oneDayInMilliseconds); 
                    yield localStorage.setItem('expirationDate', expirationDate);
                } else {
                    /**
                     * If the checkbox is checked, then set the date token as null to 
                     * avoid checking for expiracy date on start up.
                     */
                    yield localStorage.setItem('expirationDate', null);
                }
                yield localStorage.setItem('userId', user.uid);
                yield put(authActions.authSuccess(user.uid, user.email, user));
                yield put(authActions.authResetRedirectPath());
            } catch (error) {
                put(authActions.authFail(error.message));
            }
        },
    },
    authGoogle: {
        signUp: function* (action) {
            const provider = yield new firebase.auth.GoogleAuthProvider();
            try {
                const response = yield firebase.auth().signInWithPopup(provider);
                // The signed-in user info.
                const user = yield response.user;
                // Saving user to the database
                yield put(authCreator.authSaveUserToDatabaseInit(user, 'google.com', true));
                if (!action.bRememberMe) {
                    /**
                     * If the checkbox is not checked, then create a new date token to
                     * check for expiracy date on start up.
                     */
                    const expirationDate = yield new Date(new Date().getTime() + oneDayInMilliseconds); 
                    yield localStorage.setItem('expirationDate', expirationDate);
                } else {
                    /**
                     * If the checkbox is checked, then set the date token as null to 
                     * avoid checking for expiracy date on start up.
                     */
                    yield localStorage.setItem('expirationDate', null);
                }
                yield localStorage.setItem('userId', user.uid);
                yield put(authActions.authSuccess(user.uid, user.email, user));
                // Sending email verification if the user is not verified.
                if (!user.emailVerified) {
                    const currentUser = yield firebase.auth().currentUser
                    yield currentUser.sendEmailVerification();
                }
                yield put(authActions.authResetRedirectPath());
            } catch (error) {
                put(authActions.authFail(error.message));
            }
        },
        signIn: function* (action) {
            const provider = yield new firebase.auth.GoogleAuthProvider();
            try {
                const response = yield firebase.auth().signInWithPopup(provider);
                // The signed-in user info.
                const user = yield response.user;
                // Saving user to the database
                yield put(authCreator.authSaveUserToDatabaseInit(user, false, true));
                if (!action.bRememberMe) {
                    /**
                     * If the checkbox is not checked, then create a new date token to
                     * check for expiracy date on start up.
                     */
                    const expirationDate = yield new Date(new Date().getTime() + oneDayInMilliseconds); 
                    yield localStorage.setItem('expirationDate', expirationDate);
                } else {
                    /**
                     * If the checkbox is checked, then set the date token as null to 
                     * avoid checking for expiracy date on start up.
                     */
                    yield localStorage.setItem('expirationDate', null);
                }
                yield localStorage.setItem('userId', user.uid);
                yield put(authActions.authSuccess(user.uid, user.email, user));
                yield put(authActions.authResetRedirectPath());
            } catch (error) {
                put(authActions.authFail(error.message));
            }
        },
    },
    authSaveUserToDatabase: function* (action) {
        const user = action.user;
        const signUpProvider = action.signUpProvider;
        const bWantToMerge = action.bWantToMerge;
        // Firestore Init
        const firestore = firebase.firestore();
        // Creating user reference to the database.
        const userRef = yield firestore.collection('users').doc(user.uid);
        const userData = yield {
            displayName: user.displayName,
            fullName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            photoURL: user.photoURL,
            uid: user.uid,
            creationDate: firebase.firestore.Timestamp.fromDate(new Date(user.metadata.creationTime))
        }
        if (signUpProvider) {
            userData['provider'] = signUpProvider;
        }
        // The user data will be merged with any existing data in the firestore.
        yield userRef.set({
            ...userData
        }, { merge: bWantToMerge });
    },
    authLogout: function* () {
        yield call([localStorage, 'removeItem'], 'userId');  
        yield call([localStorage, 'removeItem'], 'expirationDate');
        yield firebase.auth().signOut();
        yield put(authActions.authLogout());
    },
    switchAuthModeHandler: function* () {
        yield put(authActions.switchAuthModeHandler())
    },
    checkAuthTimeout: function* (action) {
        yield delay(action.expirationTime*1000);
        yield put(authActions.authLogout());
    },
    resetPassword: function* (action) {
        const emailAddress = yield action.email;
        const  auth = yield firebase.auth();
        yield auth.sendPasswordResetEmail(emailAddress);
    }
}

/**
* Hours times seconds times milliseconds. 24 hours times 
* 3600 seconds, times 1000 milliseconds equals 1 day.
 */
const oneDayInMilliseconds = 24 * 3600 * 1000;

/**
 * TODO store userId in local storage. If the stored userId token matches 
 * the one returned by firebase keep user logged in, else log him out.
 */
const onAuthStateChanged = () => {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                resolve(user);
            } else {
                reject(new Error('No user logged in.'));
            }
        });
    });
}