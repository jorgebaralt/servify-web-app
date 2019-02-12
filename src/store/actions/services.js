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
    setTopCategories: (categories) => {
        return {
            type: actionTypes.SERVICES_SET_TOP_CATEGORIES,
            topCategories: categories
        }
    },
    setServices: (services) => {
        return {
            type: actionTypes.SERVICES_SET_SERVICES,
            ...services,
        }
    },
    resetCategories: () => {
        return {
            type: actionTypes.SERVICES_RESET_FILTERED_CATEGORIES
        }
    },
    setCoordinates: (coordinates) => {
        return {
            type: actionTypes.SERVICES_SET_COORDINATES,
            coordinates: coordinates
        }
    },
    setServicesByCategory: (action) => {
        return {
            type: actionTypes.SERVICES_SET_SERVICES_BY_CATEGORIES,
            category: action.category,
            servicesByCategories: action.services
        }
    },
    setFilteredCategories: (filteredCategories) => {
        return {
            type: actionTypes.SERVICES_SET_FILTERED_CATEGORIES,
            filteredCategories: filteredCategories
        }
    },
    setFilteredServices: (filteredServices) => {
        return {
            type: actionTypes.SERVICES_SET_FILTERED_SERVICES,
            filteredServices: filteredServices
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
    servicesInitHandler: () => {
        return {
            type: actionTypes.SERVICES_INIT
        }
    },
    topServicesByCategoriesHandler: (topCategories) => {
        return {
            type: actionTypes.SERVICES_INIT_TOP_SERVICES_BY_CATEGORIES,
            topCategories: topCategories
        }
    },
    resetCategoriesHandler: () => {
        return {
            type: actionTypes.SERVICES_INIT_RESET_FILTERED_CATEGORIES
        }
    },
    sortServicesHandler: (services, key) => {
        return {
            type: actionTypes.SERVICES_SORT_INIT,
            services: services,
            key: key
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