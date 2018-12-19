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
    }
}

const servicesReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.SERVICES_SET_FILTERED_CATEGORIES:
            return updateObject(state, {categories: action.filteredCategories});
        default:
            // do nothing
    }
    return state;
}

export default servicesReducer;