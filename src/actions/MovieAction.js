import Config from '../config';
import {MOVIE_LIST, MOVIE_SORT} from './action';

const parameters = {
	imdbID : undefined,
	title : undefined,
	type : undefined,
	year : 0,
	plot : undefined,
	search : undefined,
	page : 1
};

const buildUrl = ({imdbID, title, type, year, plot, search, page }) => {
	let url = `${Config.rootUrl}&apikey=${Config.apiKey}`;
	if (imdbID) {
		url = `${url}&i=${imdbID}`
	}
	if (title) {
		url = `${url}&t=${title}`
	}

	if (type) {
		const expectedValue = ['movie', 'series', 'episode'];
		if (expectedValue.indexOf(type) === -1) {
			console.warn("Warning : Invalid type parameter. type should be one of this 'movie', 'series' or 'episode'")
		}
		url = `${url}&type=${type}`
	}

	if (year) {
		url = `${url}&y=${year}`
	}

	if (plot) {
		const expectedPlot = ['short', 'full'];
		if (expectedPlot.indexOf(type) === -1) {
			console.warn("Warning : Invalid plot parameter. type should be one of this 'short' or 'full'")
		}
		url = `${url}&y=${year}`
	}

	if (search) {
		url = `${url}&s=${search}`
	}

	if (page > 0 ) {
		url = `${url}&page=${page}`
	}
	return url;
};

export const getMoviesList = (searchText) => async (dispatch) => {
	try {
		const params = Object.assign({}, parameters);
		params.search = searchText;
		const response = await fetch(buildUrl(params));
		const data = await response.json();
		if (data.Response === 'False') {
			console.error('Reposne error');
			return;
		}

		dispatch({
			type: MOVIE_LIST,
			payload: {...data, searchText, currentPage : 1, newSearch:true}
		});
	} catch (e) {
		console.error(e);
	}
};

export const getNextPage = (searchText, page) => async (dispatch) =>{
	try {
		const params = Object.assign({}, parameters);
		params.search = searchText;
		params.page = page;
		const response = await fetch(buildUrl(params)	);
		const data = await response.json();
		if (data.Response === 'False') {
			console.error('Reposne error');
			return;
		}

		dispatch({
			type: MOVIE_LIST,
			payload: {...data, currentPage: page, searchText}
		});
	} catch (e) {
		console.error(e);
	}
};

export const sortBy = (field, movies) => async(dispatch) => {
	const payload = sort(field, movies);
	console.log("payload:-", payload)
	dispatch({
		type: MOVIE_SORT,
		payload: payload
	});
};

const sort = (filed, movies) => {
	let result = movies.sort(function(a,b) {
		if (!Number(a[filed]) || !Number(b[filed])) {
			let tempA = a[filed].split('–');
			let tempB = b[filed].split('–');
			return Number(tempA[tempA.length-1]) - Number(tempB[tempB.length-1]);
		}
		return Number(a[filed]) - Number(b[filed]);
	});

	return result;
};
