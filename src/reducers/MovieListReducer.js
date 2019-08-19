import { MVOIE_LIST } from '../actions/action';

const initState = {
	items: [],
	totalResults: 0,
	loginStatus: false,
	searchText:'',
	currentPage:0,
};

export default (state = initState, { type, payload }) => {
	switch (type) {
		case MVOIE_LIST:
			return {
				...state,
				items: payload.newSearch ? payload.Search : [...state.items, ...payload.Search],
				totalResults: payload.totalResults,
				searchText: payload.searchText,
				currentPage:payload.currentPage
			};
		default:
			return state;
	}
};
