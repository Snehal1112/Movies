import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AddMovie from '../addmovie/AddMovie';
import Details from '../details/Details';
import MoviesList from '../MoviesList/MoviesList';
import SearchBar from '../searchbar/SearchBar';
import './MainViewport.scss';

class MainViewport extends Component {
	onClickNewBtn = () => {
		const { history:{push} } = this.props;
		push('/dashboard/add');
	};

	render() {
		const { match } = this.props;
		return (
			<div className="mainViewport">
				<SearchBar {...this.props} />
				<button className={"newBtn"} onClick={this.onClickNewBtn}>
					<i className="material-icons">add</i>
				</button>
				<Switch>
					<Route exact path={`${match.path}`} component={MoviesList} />
					<Route exact path={`${match.path}/add`} component={AddMovie} />
					<Route exact path={`${match.path}/detail`} component={Details} />
				</Switch>
			</div>
		);
	}
}

export default MainViewport;
