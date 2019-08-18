import React, { useEffect, useState } from 'react';
import Card from '../../components/cards/Card';
import './Details.scss';

const Details = (props) => {
	const { location: { state: { movie: movieDetails = {} } }, history } = props;
	const [ movie, setMovie ] = useState({});
	useEffect(
		() => {
			const { imdbID, Title } = movieDetails;
			if (imdbID === '' && Title === '') {
				console.error('invalid movie details');
			}
			// TODO: API call must be call from the redux only.
			fetch(`http://www.omdbapi.com/?i=${movieDetails.imdbID}&apikey=49e882e5`)
				.then((response) => response.json())
				.then((data) => {
					return setMovie(data);
				});
		},
		[ movieDetails ]
	);

	const isEmptyObject = (obj) => Object.getOwnPropertyNames(obj).length === 0;

	const onClickBackBtn = () => {
		history.push('/dashboard');
	};
	return (
		<div className="detailCard">
			{/* TODO: Create common button in components so we can reuse this. */}
			<button className="backBtn" onClick={onClickBackBtn}>
				<i className="material-icons">arrow_back</i>
			</button>
			{!isEmptyObject(movie) && <Card movie={movie} />}
		</div>
	);
};
export default Details;
