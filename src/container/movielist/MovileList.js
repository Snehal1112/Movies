import React, { PureComponent } from 'react';
import Card from '../../components/cards/Card';

class MovileList extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			movies: [],
			totalResults: 0
		};
	}
	componentDidMount() {
		fetch('http://www.omdbapi.com/?s=time&page=1&apikey=49e882e5')
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				return this.setState({ movies: data.Search, totalResults: data.totalResults });
			});
	}

	onMovieSelect = (e, movie) => {
		const { history, match } = this.props;
		history.push(`${match.path}/detail`, { movie });
	};

	render() {
		const { movies } = this.state;
		return (
			<div className="movieList">
				{movies.map((movie) => {
					return <Card key={movie.imdbID} movie={movie} handler={this.onMovieSelect} />;
				})}
			</div>
		);
	}
}

export default MovileList;
