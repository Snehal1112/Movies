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
			payload: {...data, searchText, currentPage : 1, newSearch:true}
		});
	} catch (e) {
		console.error(e);
	}
};

export const getNextPage = (searchText, page) => async (dispatch) =>{
	try {
		const response = await fetch(`${Config.rootUrl}s=${searchText}&page=${page}&apikey=${Config.apiKey}`);
		const data = await response.json();
		if (data.Response === 'False') {
			console.error('Reposne error');
			return;
		}

		dispatch({
			type: MVOIE_LIST,
			payload: {...data, currentPage: page, searchText}
		});
	} catch (e) {
		console.error(e);
	}
};
