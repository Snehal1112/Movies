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
	switch (field) {
		case 'Year':
			sortByYear(movies);
			break;
		case 'imdbRating':
			sortByRating(movies);
			break;
		default:
			console.warn(`Sorting on ${field} does't supported.`)
	}

	dispatch({
		type: MOVIE_SORT,
		payload: movies
	});
};


const sortByYear = (movies)=>{
	movies.map((item)=>{
		const year = String(item["Year"]);
		const index = year.search("–");
		if (index > -1) {
			const s = year.split("–");
		}
		return year
	})
};

const sort = () => {

};

const sortByRating = (movies)=>{

};

