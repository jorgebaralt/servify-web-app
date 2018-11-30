import { takeEvery } from 'redux-saga/effects';

import { mobileSagas } from './mobile';

import * as actionTypes from '../actions/types';

export function* watchMobile () {
    yield takeEvery(actionTypes.MOBILE_SAGA_INIT, mobileSagas.isMobile)
}