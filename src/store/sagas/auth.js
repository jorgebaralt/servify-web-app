// Redux Saga
import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
// Callbacks
import firebase from 'firebase';
// Actions
import { authActions, parseErrorMessage } from '../actions';

export const authSagas = {
    authCheckState: function* () {
        const token = yield localStorage.getItem('token');
        if (!token) {
            yield put(authActions.authLogout());
        } else {
            const userId = yield localStorage.getItem('userId');
            const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                yield put(authActions.authLogout());
            }
            yield put(authActions.authSuccess(token, userId));
            yield put(authActions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
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
            const response = yield firebase.auth().createUserWithEmailAndPassword(action.email, action.password);
            console.log('response', response);
            if (action.bRememberMe) {
                yield localStorage.setItem('token', response.user.refreshToken);
                yield firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
            } else {
                yield firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
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
            const response = yield firebase.auth().signInWithEmailAndPassword(action.email, action.password);
            console.log('response', response);
            if (action.bRememberMe) {
                yield localStorage.setItem('token', response.user.refreshToken);
                yield firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
            } else {
                yield firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
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