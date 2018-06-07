
import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import profileReducer from './profile_reducer';

const reducer = combineReducers({
	auth: authReducer,
	user: profileReducer
});

export default reducer;
