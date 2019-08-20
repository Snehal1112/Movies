import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getMoviesList } from '../../actions/MovieAction';
import Input from '../../components/formfields/Input';

class SearchBar extends PureComponent {
	startSearch = (searchText) => {
		this.props.getMoviesList(searchText);
		const { history, location: { pathname } } = this.props;
		if (pathname !== '/dashboard') {
			history.push('/dashboard');
		}
	};

	render() {
		return (
			<div className="searchBar">
				<Input
					placeHolder="Search"
					actionBtn={{
						show: true,
						icon: 'search',
						handler: this.startSearch
					}}
				/>
			</div>
		);
	}
}
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { getMoviesList })(SearchBar);
