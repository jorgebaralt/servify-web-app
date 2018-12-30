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
    resetCategories: () => {
        return {
            type: actionTypes.SERVICES_RESET_FILTERED_CATEGORIES
        }
    },
    setFilteredCategories: (filteredCategories) => {
        return {
            type: actionTypes.SERVICES_SET_FILTERED_CATEGORIES,
            filteredCategories: filteredCategories
        }
    },
    setBIsDefault: (bIsDefault) => {
        return {
            type: actionTypes.SERVICES_SET_BISDEFAULT,
            bIsDefault: bIsDefault
        }
    }
}

export const servicesCreator = {
    resetCategoriesHandler: () => {
        return {
            type: actionTypes.SERVICES_INIT_RESET_FILTERED_CATEGORIES
        }
    },
    filteredCategoriesHandler: (prevState, key) => {
        return {
            type: actionTypes.SERVICES_INIT_FILTERED_CATEGORIES,
            prevCategories: prevState,
            toggledCategory: key
        }
    }
}