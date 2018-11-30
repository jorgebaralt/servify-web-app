import { takeEvery } from 'redux-saga/effects';

import { mobileSagas } from './mobile';
// import { categoriesSaga } from './saga

import * as actionTypes from '../actions/types';

export function* watchMobile () {
    yield takeEvery(actionTypes.MOBILE_SAGA_INIT, mobileSagas.isMobile)
}

// export function* watchCategories () {
//     yield takeEvery(actionTypes.CATEGORIES_SAGA_INIT, categoriesSaga.fetchCategories)
// }