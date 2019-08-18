import React from 'react';
import './Card.scss';

function Card(props) {
	const { movie, handler = () => {} } = props;
	const showMovieDetail = (movie) => {
		const details = [];
		let i = 0;
		const ignore = [ 'Title', 'Poster' ];
		for (const key in movie) {
			if (movie.hasOwnProperty(key)) {
				const element = movie[key];
				if (!Array.isArray(element) && ignore.indexOf(key) === -1) {
					details.push(
						<div key={i++} className="subtitle">
							<span className="lable">{key}: </span>
							<span>{element}</span>
						</div>
					);
				}
			}
		}
		return details;
	};
	return (
		<div
			className="cardContainer"
			onClick={() => {
				handler(movie);
			}}
		>
			<div className="cardMedia">
				<img src={movie.Poster} alt={movie.Title} />
			</div>
			<div className="cardContent">
				<div className="cardBody">
					<div className="cardHeader">
						<h2>{movie.Title}</h2>
					</div>
					{showMovieDetail(movie)}
				</div>
			</div>
		</div>
	);
}
export default Card;
