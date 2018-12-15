import * as types from '../actions/types';

import { updateObject } from '../../shared/updateObject';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: "/",
    authMode: null
}


const mobileReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.AUTH_MODE_HANDLER:
            return updateObject(state, {authMode: action.authMode});
        case types.AUTH_START:
            return updateObject(state, {error: null, loading: true});
        case types.AUTH_FAIL:
            return updateObject(state, {token: null, userId: null, error: action.error, loading: false});
        case types.AUTH_SUCCESS:
            return updateObject(state, {token: action.idToken, userId: action.userId, error: null, loading: false});
        case types.AUTH_LOGOUT: 
            return updateObject(state, {token: null, userId: null, error: null, loading: false});
        case types.AUTH_SET_REDIRECT_PATH:
            return updateObject(state, {authRedirectPath: action.path});
        default:
            // do nothing
    }
    return state;
}

export default mobileReducer;