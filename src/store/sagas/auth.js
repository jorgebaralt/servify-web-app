import { put } from 'redux-saga/effects';

import { authActions } from '../actions';

export const mobileSagas = {
    switchAuthModeHandler: function* () {
        yield put(authActions.switchAuthModeHandler())
    },
}