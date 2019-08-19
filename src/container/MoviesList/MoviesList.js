import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import Card from '../../components/cards/Card';
import {getNextPage} from '../../actions/MovieAction';
import DropDown from '../../components/formfields/DropDown';
import DropDownItem from '../../components/formfields/DropDownItem';

class MoviesList extends PureComponent {
	constructor(props) {
		super(props)
		this.timer = undefined;
	}

	onMovieSelect = (movie) => {
		const {history, match} = this.props;
		history.push(`${match.path}/detail`, {movie});
	};

	componentDidMount() {
		window.addEventListener('scroll', this.onScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll);
	}

	onScroll = (event) => {
		// TODO: Find proper way to live scroll.
		const scrollEl = document.scrollingElement;
		const scrollHeight = scrollEl.scrollHeight - scrollEl.offsetHeight;
		const scrollStatus = scrollEl.scrollTop;

		if (scrollStatus >= scrollHeight) {
			clearTimeout(this.timer);
			this.timer = setTimeout((event) => {
				const {currentPage, searchText, totalResults, getNextPage, movies} = this.props;
				const nextPage = parseInt(currentPage) + 1;
				if (totalResults > 10 && totalResults !== movies.length) {
					getNextPage(searchText, nextPage);
				}
			}, 300, event)
		}
	};


	render() {
		const {movies} = this.props;
		return (
			<div className="movieListContainer">
				<div className={"actionBar"} >
					<button style={{height:"100%"}}>call</button>
				</div>
				<DropDown placeHolder="Select item" handler={(e)=>{console.log(e.target)}}>
					<DropDownItem name={"snehal1"}/>
					<DropDownItem name={"snehal2"}/>
					<DropDownItem name={"snehal3"}/>
				</DropDown>
				{movies.map((movie, index) => {
					return <Card key={index} movie={movie} handler={this.onMovieSelect}/>;
				})}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	movies: state.movies.items,
	totalResults: state.movies.totalResults,
	searchText: state.movies.searchText,
	currentPage: state.movies.currentPage
});

export default connect(mapStateToProps, {getNextPage})(MoviesList);
