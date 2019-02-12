import mobileReducer from './mobile';
import servicesReducer from './services';
import authReducer from './auth';
import usersReducer from './users';
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
	mobileReducer,
	servicesReducer,
	authReducer,
	usersReducer
});

export default rootReducer