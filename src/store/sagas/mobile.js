import { put } from 'redux-saga/effects';

import { mobileActions } from '../actions';

export const mobileSagas = {
    isMobile: function* () {
        yield put(mobileActions.isMobile())
    },
}