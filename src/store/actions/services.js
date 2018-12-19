import * as actionTypes from './types';

export const toggleFileredCategories = (prevState, key) => {
    return {
        categories: {
            ...prevState.categories,
            [key]: !prevState.categories[key]
        }
    }
}

export const servicesActions = {
    setFilteredCategories: (filteredCategories) => {
        return {
            type: actionTypes.SERVICES_SET_FILTERED_CATEGORIES,
            filteredCategories: filteredCategories
        }
    }
}

export const servicesCreator = {
    filteredCategoriesHandler: (prevState, key) => {
        return {
            type: actionTypes.SERVICES_INIT_FILTERED_CATEGORIES,
            prevCategories: prevState,
            toggledCategory: key
        }
    }
}