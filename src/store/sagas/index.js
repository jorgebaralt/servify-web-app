import { takeEvery } from 'redux-saga/effects';

import { mobileSagas } from './mobile';
import { servicesSagas } from './services';

import * as actionTypes from '../actions/types';

export function* watchMobile () {
    yield takeEvery(actionTypes.MOBILE_SAGA_INIT, mobileSagas.isMobile);
}

export function* watchServices () {
    yield takeEvery(actionTypes.SERVICES_INIT_FILTERED_CATEGORIES, servicesSagas.setFilteredCategories);
    yield takeEvery(actionTypes.SERVICES_INIT_RESET_FILTERED_CATEGORIES, servicesSagas.resetFilteredCategories);
}