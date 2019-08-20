import { MOVIE_LIST, MOVIE_SORT } from '../actions/action';

const initState = {
	items : [],
	totalResults : 0,
	loginStatus : false,
	searchText : '',
	currentPage : 0,
};

export default (state = initState, { type, payload }) => {
	switch (type) {
		case MOVIE_LIST:
			return {
				...state,
				items : payload.newSearch ? payload.Search : [...state.items, ...payload.Search],
				totalResults : payload.totalResults,
				searchText : payload.searchText,
				currentPage :payload.currentPage
			};
		case MOVIE_SORT:
			return {
				...state,
				// As we use pure component we need to destructor the payload.
				items: [...payload]
			};
		default:
			return state;
	}
};
