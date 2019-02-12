import * as types from '../actions/types';

import categories from '../../shared/categories';

import { updateObject } from '../../shared/updateObject';

// Categories object to be used for filtering
const categoriesObj = {};
categories.map( (category) => {
    return categoriesObj[category.title] = false; // Parsing special characters from titles to allow only letters
});

const initialCategories = { ...categoriesObj };

const initialState = {
    coordinates: null,
    topCategories: null,
    initialCategories: initialCategories,
    categories: {
        ...categoriesObj
    },
    services: {
        byCategories: null,
        topServices: null,
        nearServices: null
    },
    bIsLoading: false,
    bIsDefault: true
}

const servicesReducer = (state = initialState, action) => {
    let services;
    switch(action.type) {
        case types.SERVICES_SET_COORDINATES:
            return updateObject(state, {coordinates: action.coordinates});
        case types.SERVICES_SET_SERVICES:
            services = updateObject(state.services, {...action});
            return updateObject(state, {services: services});
        case types.SERVICES_SET_TOP_CATEGORIES:
            return updateObject(state, {topCategories: action.topCategories});
        case types.SERVICES_RESET_FILTERED_CATEGORIES:
            return updateObject(state, {categories: initialCategories, bIsDefault: true, bIsLoading: false});
        case types.SERVICES_SET_FILTERED_CATEGORIES:
            return updateObject(state, {categories: action.filteredCategories, bIsLoading: true});
        case types.SERVICES_SET_FILTERED_SERVICES:
            services = updateObject(state.services, {...action});
            return updateObject(state, {services: services});
        case types.SERVICES_SET_SERVICES_BY_CATEGORIES:
            const byCategories = {
                ...state.services.byCategories,
                [action.category]: action.servicesByCategories
            };
            services = updateObject(state.services, { byCategories });
            return updateObject(state, {services: services});
        case types.SERVICES_SET_BISDEFAULT:
            return updateObject(state, {bIsLoading: false, bIsDefault: action.bIsDefault});
        default:
            // do nothing
    }
    return state;
}

export default servicesReducer;