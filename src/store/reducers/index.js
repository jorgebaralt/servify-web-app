import mobileReducer from './mobile';
import servicesReducer from './services';
import authReducer from './auth';
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
	mobileReducer,
	servicesReducer,
	authReducer
});

export default rootReducer