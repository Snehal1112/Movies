import { MVOIE_LIST } from './action';
export const getMoviesList = (searchText) => async (dispatch) => {
	try {
		const response = await fetch(`http://www.omdbapi.com/?s=${searchText}&page=1&apikey=49e882e5`);
		const data = await response.json();
		if (data.Response === 'False') {
			console.error('Reposne error');
			return;
		}

		dispatch({
			type: MVOIE_LIST,
			payload: data
		});
	} catch (e) {
		console.error(e);
	}
};
