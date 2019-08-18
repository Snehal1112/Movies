import Config from '../config';
import { MVOIE_LIST } from './action';
export const getMoviesList = (searchText) => async (dispatch) => {
	try {
		const response = await fetch(`${Config.rootUrl}s=${searchText}&apikey=${Config.apiKey}`);
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
