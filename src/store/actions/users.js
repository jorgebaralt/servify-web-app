import * as actionTypes from './types';

export const usersActions = {
    // Users routes.
    usersSaveLocation: (locationData) => {
        return {
            type: actionTypes.USERS_SAVE_LOCATION,
            locationData: locationData
        }
    }
}