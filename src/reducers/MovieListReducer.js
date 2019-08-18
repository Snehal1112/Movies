import { LOGIN_FALIOR, LOGIN_SUCCESS, MVOIE_LIST } from '../actions/action';

const initState = {
	items: [],
	totalResults: 0,
	loginStatus: false
};

export default (state = initState, { type, payload }) => {
	switch (type) {
		case MVOIE_LIST:
			return {
				...state,
				items: payload.Search,
				totalResults: payload.totalResults
			};
		case LOGIN_FALIOR:
		case LOGIN_SUCCESS:
			console.log(payload);
			return {
				...state,
				loginStatus: payload
			};
		default:
			return state;
	}
};
