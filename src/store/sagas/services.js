import { put } from 'redux-saga/effects';

import { servicesActions } from '../actions';

export const servicesSagas = {
    setFilteredCategories: function* (action) {
        const categories = {
            ...action.prevCategories,
            [action.toggledCategory]: !action.prevCategories[action.toggledCategory]
        }
        yield put(servicesActions.setFilteredCategories(categories));
    }
}