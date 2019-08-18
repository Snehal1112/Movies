import React, { Component } from 'react';
import Input from '../../components/formfields/Input';

class SearchBar extends Component {
	render() {
		return (
			<div className="searchBar">
				<Input
					placeHolder="Search"
					actionBtn={{
						show: true,
						icon: 'search'
					}}
				/>
			</div>
		);
	}
}
export default SearchBar;
