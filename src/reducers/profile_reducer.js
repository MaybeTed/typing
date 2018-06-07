
export default function(state = {}, action) {
	if (action.type === 'POPULATE_PROFILE') {
		return action.payload;
	}
	return state;
}
