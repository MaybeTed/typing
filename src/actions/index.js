import axios from 'axios';
import store from '../../store';

const Actions = {};

Actions.fetchUser = async () => {
	const response = await axios('/api/getUser');
	store.dispatch({
		type: 'FETCH_USER',
		payload: response.data
	});
}

Actions.populateProfile = async (username) => {
	const response = await axios(`/api/profile?name=${username}`);
	store.dispatch({
		type: 'POPULATE_PROFILE',
		payload: response.data
	});
}

export default Actions;
