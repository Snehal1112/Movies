import React, { Component } from 'react';
import Input from '../../components/formfields/Input';

class SearchBar extends Component {
	startSearch = (searchText) => {
		console.log(searchText);
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
export default SearchBar;
