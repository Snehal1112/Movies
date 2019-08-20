import React,{Fragment, useState} from 'react';
import Input from "../../components/formfields/Input";
import DropDown, {DropDownItem} from "../../components/formfields/DropDown";
import './AddMovie.scss';

const AddMovie = (props) => {
	const { history } = props;
	const [genre, setGenre] = useState(null);

	const onClickBackBtn = () => {
		history.push('/dashboard');
	};

	const onSelectionChange = (value) => {
		console.log(value)
	};

	return (
		<Fragment>
			<button className="backBtn" onClick={onClickBackBtn}>
				<i className="material-icons">arrow_back</i>
			</button>
			<div className={"container"}>
				<div className={"header"}> Add New Movie</div>
				<div className={'body'}>
					<Input placeHolder={'Title'}/>
					<Input placeHolder={'Year'}/>
					<DropDown
						maxSelect={3}
						size={35}
						placeHolder={"Select Genre"}
						multiSelect = {true}
						onSelect={onSelectionChange}
					>
						<DropDownItem id={'Action'} name={'Action'}/>
						<DropDownItem id={'Adventure'} name={'Adventure'}/>
						<DropDownItem id={'Comedy'} name={"Comedy"}/>
						<DropDownItem id={'Sci-Fi'} name={"Sci-Fi"}/>
					</DropDown>
					<DropDown minSelect={1} size={35} placeHolder={"Select Language"} onSelect={onSelectionChange}>
						<DropDownItem id={'English'} name={'English'}/>
						<DropDownItem id={'Dutch'} name={'Dutch'}/>
						<DropDownItem id={'German'} name={"German"}/>
					</DropDown>
				</div>
			</div>
		</Fragment>
		);
};
export default AddMovie;
