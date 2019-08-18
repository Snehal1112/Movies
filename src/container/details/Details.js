import React, { useEffect, useState } from 'react';
import Card from '../../components/cards/Card';

const Details = (props) => {
	const { location: { state: { movie: movieDetails = {} } } } = props;
	const [ movie, setMovie ] = useState({});
	console.log('movie:-', movie);

	useEffect(
		() => {
			const { imdbID, Title } = movieDetails;
			if (imdbID === '' && Title === '') {
				console.error('invalid movie details');
			}
			fetch(`http://www.omdbapi.com/?i=${movieDetails.imdbID}&apikey=49e882e5`)
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
					return setMovie(data);
				});
		},
		[ movieDetails ]
	);

	const isEmptyObject = (obj) => Object.getOwnPropertyNames(obj).length === 0;

	const showMoviesDetails = (movie) => {
		return <Card movie={movie} />;
	};
	return <div>{!isEmptyObject(movie) && showMoviesDetails(movie)}</div>;
};
export default Details;
