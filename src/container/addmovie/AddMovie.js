import React,{Fragment, useState} from 'react';
import Input from "../../components/formfields/Input";
import DropDown, {DropDownItem} from "../../components/formfields/DropDown";
import './AddMovie.scss';
import {ERROR, NONE} from "../utils/ErrorTypes";

const AddMovie = (props) => {
	const { history } = props;

	let timer = null;

	const [title, setTitle] = useState({title: '', error : { type:NONE, message:''}});
	const [year, setYear] = useState({year: '', yearError : { type:NONE, message:''}});
	const [genre, setGenre] = useState(null);
	const [language, setLanguage] = useState(null);

	const onTextChange = (value) => {
		clearTimeout(timer);
		timer = setTimeout(()=>{
			if(value) {
				if (parseInt(value) !== 1988) {
					setYear({...year, year:value, yearError:{type:ERROR, message:"sdd"}});
				} else {
					setYear({...year, year:value, yearError:{type:NONE, message:""}});
				}
			}
		}, 2000);
	};

	const onTextChange2 = (value) => {
		clearTimeout(timer);
		timer = setTimeout(()=>{
			if(value) {
				if (parseInt(value) !== 1900) {
					setTitle({...title, title:value, error:{type:ERROR, message:"Title error"}});
				} else {
					setTitle({...title, title:value, error:{type:NONE, message:""}});
				}
			}
		}, 2000);
	};

	/**
	 *
	 * @param event
	 */
	const saveMovie = (event) => {
		event.preventDefault();
		console.log(title, year, genre, language)
	};

	return (
		<Fragment>
			<button className="backBtn" onClick={() => history.push('/dashboard')}>
				<i className="material-icons">arrow_back</i>
			</button>
			<div className={"container"}>
				<div className={"header"}> Add New Movie</div>
				<div className={'body'}>
					<Input name={'title'} placeHolder={'Title'}  onInputChange={onTextChange2}error = {title.error}/>
					<Input name={'year'} placeHolder={'Year'} onInputChange={onTextChange} error = {year.yearError}/>
					<DropDown
						maxSelect={3}
						size={35}
						placeHolder={"Select Genre"}
						multiSelect = {true}
						onSelect={(value)=>setGenre(value)}
					>
						<DropDownItem id={'Action'} name={'Action'}/>
						<DropDownItem id={'Adventure'} name={'Adventure'}/>
						<DropDownItem id={'Comedy'} name={"Comedy"}/>
						<DropDownItem id={'Sci-Fi'} name={"Sci-Fi"}/>
					</DropDown>
					<DropDown
						minSelect={1}
						size={35}
						placeHolder={"Select Language"}
						onSelect={(value)=>setLanguage(value)}
					>
						<DropDownItem id={'English'} name={'English'}/>
						<DropDownItem id={'Dutch'} name={'Dutch'}/>
						<DropDownItem id={'German'} name={"German"}/>
					</DropDown>
					<div className={"footerToolbar"}>
						<button onClick={saveMovie}>Save</button>
					</div>
				</div>
			</div>
		</Fragment>
		);
};
export default AddMovie;
