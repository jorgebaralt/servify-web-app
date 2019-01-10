import * as types from '../actions/types';

import { updateObject } from '../../shared/updateObject';

const initialState = {
    userId: null,
    userEmail: null,
    error: null,
    loading: true,
    authRedirectPath: "/",
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.AUTH_INIT:
            return updateObject(state, {userId: action.userId, userEmail: action.userEmail, error: null, loading: true});
        case types.AUTH_SUCCESS:
            return updateObject(state, {userId: action.userId, userEmail: action.userEmail, error: null, loading: false});
        case types.AUTH_FAIL:
            return updateObject(state, {userId: null, userEmail: null, error: action.error, loading: false});
        case types.AUTH_LOGOUT: 
            return updateObject(state, {userId: null, userEmail: null, error: null, loading: false});
        case types.AUTH_RESET_ERROR_MESSAGE:
            return updateObject(state, {error: null});
        case types.AUTH_SET_REDIRECT_PATH:
            return updateObject(state, {authRedirectPath: action.path});
        default:
            // do nothing
    }
    return state;
}

export default authReducer;