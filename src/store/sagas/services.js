import { put } from 'redux-saga/effects';
import { delay } from 'redux-saga'

import { servicesActions } from '../actions';

export const servicesSagas = {
    setFilteredCategories: function* (action) {
        const categories = {
            ...action.prevCategories,
            [action.toggledCategory]: !action.prevCategories[action.toggledCategory]
        }
        yield put(servicesActions.setFilteredCategories(categories));
        yield delay(250); // To force asynchronous loading, 250ms. MIGHT be replaced by axios call to fetch services later on.
        yield put(servicesActions.setBIsDefault(!Object.values(categories).includes(true)));
    }
}