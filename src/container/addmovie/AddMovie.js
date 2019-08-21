import React,{Fragment, useState} from 'react';
import Input from "../../components/formfields/Input";
import DropDown, {DropDownItem} from "../../components/formfields/DropDown";
import './AddMovie.scss';
import {NONE} from "../utils/ErrorTypes";
import checkInitValidation from "../utils/ValidationFactory";
import TextArea from "../../components/formfields/TextArea";

const AddMovie = (props) => {
	const { history } = props;

	let timer = null;

	const [title, setTitle] = useState({value : '', error: { type : NONE, message : ''}, dirty : false});
	const [year, setYear] = useState({value : '', error: { type : NONE, message : ''}, dirty : false});
	const [plot, setPlot] = useState({value : '', error: { type : NONE, message : ''}, dirty : false});
	const [url, setUrl] = useState({value : '', error: { type : NONE, message : ''}, dirty : false});
	const [genre, setGenre] = useState(null);
	const [language, setLanguage] = useState(null);

	const onYearChange = (value) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			checkInitValidation(value, year,setYear, 'year');
		}, 1000);
	};

	const onTitleChange = (value) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			checkInitValidation(value, title, setTitle, 'title');
		}, 1000);
	};

	const onPlotChange = (value) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			checkInitValidation(value, plot, setPlot, 'plot');
		}, 1000);
	};

	const onURLChange = (value) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			checkInitValidation(value, url, setUrl, 'url');
		}, 1000);
	};

	/**
	 *
	 * @param event
	 */
	const saveMovie = (event) => {
		var result = {title:title.value, year:year.value, genre, language, plot:plot.value, url:url.value};
		console.log("Result:-", result);
	};

	return (
		<Fragment>
			<button className="backBtn" onClick={() => history.push('/dashboard')}>
				<i className="material-icons">arrow_back</i>
			</button>
			<div className={"container"}>
				<div className={"header"}> Add New Movie</div>
				<div className={'body'}>
					<Input name={'title'} placeHolder={'Title'}  onInputChange={onTitleChange} error = {title.error}/>
					<Input type = {"number"} name={'year'} placeHolder={'Enter Year (YYYY)'} onInputChange={onYearChange} error = {year.error}/>
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
					<div style={{maxWidth:300}}>
						<TextArea name={'plot'} row={8} placeHolder={'Enter plot in minimum 100 and maximum 500 characters.'} onInputChange={onPlotChange} error={plot.error}/>
					</div>
					<Input name={'url'} placeHolder={'URL'}  onInputChange={onURLChange} error = {url.error}/>
					<div className={"footerToolbar"}>
						<button onClick={saveMovie}>Save</button>
					</div>
				</div>
			</div>
		</Fragment>
		);
};
export default AddMovie;
