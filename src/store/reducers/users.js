import * as types from '../actions/types';

import { updateObject } from '../../shared/updateObject';

const initialState = {
    locationData: {},
}

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.USERS_SAVE_LOCATION:
            return updateObject(state, { locationData: { ...state.locationData, ...action.locationData } });
        default:
            // do nothing
    }
    return state;
}

export default usersReducer;