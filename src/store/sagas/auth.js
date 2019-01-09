// Redux Saga
import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
// Firebase methods
import firebase from 'firebase';
// Actions
import { authActions, parseErrorMessage } from '../actions';

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

export const authSagas = {
    authCheckState: function* () {
        try {
            const currentUser = yield call(onAuthStateChanged);
            if (!currentUser.uid) {
                yield firebase.auth().signOut();
                yield put(authActions.authLogout());
            } else {
                yield put(authActions.authSuccess(currentUser.uid));
            }
        } catch (error) {
            console.error(error);
        }
    },
    authSignUp: function* (action) {
        // yield put(authActions.authStart());
        // const authData = {
        //     email: action.email,
        //     password: action.password,
        //     returnSecureToken: true
        // }
        try {
            // const response = yield axios.post(url, authData);
            yield firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
            const response = yield firebase.auth().createUserWithEmailAndPassword(action.email, action.password);
            console.log('response', response);
            if (action.bRememberMe) {
                yield localStorage.setItem('token', response.user.refreshToken);
            }
            yield put(authActions.authSuccess(response.user.uid));
            // const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
            // yield localStorage.setItem('userId', response.user.localId);
            // yield localStorage.setItem('expirationDate', expirationDate);
            // yield put(authActions.checkAuthTimeout(response.data.expiresIn));
        } catch (error) {
            yield console.log(error)
            // const errorMessage = yield parseErrorMessage(true, error.response.data.error.message);
            // yield put(authActions.authFail(errorMessage));
        }
    },
    authSignIn: function* (action) {
        try {
            yield firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
            const response = yield firebase.auth().signInWithEmailAndPassword(action.email, action.password);
            console.log('response', response);
            if (action.bRememberMe) {
                yield localStorage.setItem('token', response.user.refreshToken);
            }
            yield put(authActions.authSuccess(response.user.uid));
            // const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
            // yield localStorage.setItem('token', response.user.idToken);
            // yield localStorage.setItem('userId', response.user.localId);
            // yield localStorage.setItem('expirationDate', expirationDate);
            // yield put(authActions.authSuccess(response.data.idToken, response.data.localId));
            // yield put(authActions.checkAuthTimeout(response.data.expiresIn));
        } catch (error) {
            yield console.log(error);
            // const errorMessage = yield parseErrorMessage(false, error.response.data.error.message);
            // yield put(authActions.authFail(errorMessage));
        }
    },
    authLogout: function* () {
        // yield call([localStorage, 'removeItem'], 'token');  
        // yield call([localStorage, 'removeItem'], 'userId');  
        // yield call([localStorage, 'removeItem'], 'expirationDate');
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
}