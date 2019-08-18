import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Card from '../../components/cards/Card';

class MovileList extends PureComponent {
	onMovieSelect = (movie) => {
		const { history, match } = this.props;
		history.push(`${match.path}/detail`, { movie });
	};

	render() {
		const { movies } = this.props;
		return (
			<div className="movieList">
				{movies.map((movie) => {
					return <Card key={movie.imdbID} movie={movie} handler={this.onMovieSelect} />;
				})}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	movies: state.movies.items,
	totalResults: state.movies.totalResults
});

export default connect(mapStateToProps, {})(MovileList);
