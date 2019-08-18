import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AddMovie from '../addmovie/AddMovie';
import Details from '../details/Details';
import MovileList from '../movielist/MovileList';
import SearchBar from '../searchbar/SearchBar';
import './MainViewport.scss';

class MainViewport extends Component {
	render() {
		const { match } = this.props;
		return (
			<div className="mainViewport">
				<SearchBar {...this.props} />
				<Switch>
					<Route exact path={`${match.path}`} component={MovileList} />
					<Route exact path={`${match.path}/add`} component={AddMovie} />
					<Route exact path={`${match.path}/detail`} component={Details} />
				</Switch>
			</div>
		);
	}
}

export default MainViewport;
