import * as types from '../actions/types';

import categories from '../../shared/categories';

import { updateObject } from '../../shared/updateObject';

// Categories object to be used for filtering
const categoriesObj = {};
categories.map( (category) => {
    return categoriesObj[category.title] = false; // Parsing special characters from titles to allow only letters
});

const initialState = {
    categories: {
        ...categoriesObj
    },
    bIsLoading: false,
    bIsDefault: true
}

const servicesReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.SERVICES_RESET_FILTERED_CATEGORIES:
            console.log('categories reset');
            return updateObject(state, {categories: {...categoriesObj}, bIsLoading: false});
        case types.SERVICES_SET_FILTERED_CATEGORIES:
            return updateObject(state, {categories: action.filteredCategories, bIsLoading: true});
        case types.SERVICES_SET_BISDEFAULT:
            return updateObject(state, {bIsLoading: false, bIsDefault: action.bIsDefault});
        default:
            // do nothing
    }
    return state;
}

export default servicesReducer;