import { MVOIE_LIST } from '../actions/action';

const initState = {
	items: [],
	totalResults: 0
};

export default (state = initState, { type, payload }) => {
	switch (type) {
		case MVOIE_LIST:
			return {
				...state,
				items: payload.Search,
				totalResults: payload.totalResults
			};
		default:
			return state;
	}
};
