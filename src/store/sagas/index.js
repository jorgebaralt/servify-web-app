// Redux Saga
import { takeEvery, all } from 'redux-saga/effects';
// Sagas
import { mobileSagas } from './mobile';
import { servicesSagas } from './services';
import { authSagas } from './auth';

import * as actionTypes from '../actions/types';

export function* watchMobile () {
    yield takeEvery(actionTypes.MOBILE_SAGA_INIT, mobileSagas.isMobile);
}

export function* watchServices () {
    yield all([
        takeEvery(actionTypes.SERVICES_INIT, servicesSagas.servicesInit),
        takeEvery(actionTypes.SERVICES_INIT_TOP_SERVICES_BY_CATEGORIES, servicesSagas.setTopServicesByCategories),
        takeEvery(actionTypes.SERVICES_INIT_FILTERED_CATEGORIES, servicesSagas.setFilteredCategories),
        takeEvery(actionTypes.SERVICES_INIT_RESET_FILTERED_CATEGORIES, servicesSagas.resetFilteredCategories),
        takeEvery(actionTypes.SERVICES_SORT_INIT, servicesSagas.sortServices)
    ]);
}

export function* watchAuth () {
    yield all([
        takeEvery(actionTypes.AUTH_INIT_SAGA, authSagas.authCheckState),
        takeEvery(actionTypes.AUTH_INIT_SIGN_UP, authSagas.authSignUp),
        takeEvery(actionTypes.AUTH_INIT_SIGN_IN, authSagas.authSignIn),
        takeEvery(actionTypes.AUTH_INIT_FACEBOOK_SIGN_IN, authSagas.authFacebook.signIn),
        takeEvery(actionTypes.AUTH_INIT_FACEBOOK_SIGN_UP, authSagas.authFacebook.signUp),
        takeEvery(actionTypes.AUTH_INIT_GOOGLE_SIGN_IN, authSagas.authGoogle.signIn),
        takeEvery(actionTypes.AUTH_INIT_GOOGLE_SIGN_UP, authSagas.authGoogle.signUp),
        takeEvery(actionTypes.AUTH_INIT_SAGA_LOGOUT, authSagas.authLogout),
        takeEvery(actionTypes.AUTH_INIT_SAVE_USER_TO_DATABASE, authSagas.authSaveUserToDatabase),
        takeEvery(actionTypes.AUTH_INIT_RESET_PASSWORD, authSagas.resetPassword)
    ]);
}