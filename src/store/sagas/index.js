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
        takeEvery(actionTypes.SERVICES_INIT_FILTERED_CATEGORIES, servicesSagas.setFilteredCategories),
        takeEvery(actionTypes.SERVICES_INIT_RESET_FILTERED_CATEGORIES, servicesSagas.resetFilteredCategories)
    ]);
}

export function* watchAuth () {
    yield all([
        takeEvery(actionTypes.AUTH_INIT_SIGN_UP, authSagas.authSignUp),
        takeEvery(actionTypes.AUTH_INIT_SIGN_IN, authSagas.authSignIn),
        takeEvery(actionTypes.AUTH_INIT_SAGA_LOGOUT, authSagas.authLogout)
    ]);
}