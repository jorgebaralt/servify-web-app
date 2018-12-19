import mobileReducer from './mobile';
import servicesReducer from './services';
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
	mobileReducer,
	servicesReducer
});

export default rootReducer