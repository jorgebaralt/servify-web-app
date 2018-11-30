import * as types from '../actions/types';

import { updateObject } from '../../shared/updateObject';

const initialState = {
    isMobile: null
}


const mobileReducer = (state = initialState, action) => {
    console.log(state, action)
    switch(action.type) {
        case types.IS_MOBILE_REDUCER:
            return updateObject(state, {isMobile: action.isMobile});
        default:
            // do nothing
    }
    return state;
}

export default mobileReducer;