import {ERROR, NONE} from "./ErrorTypes";
import validator from 'validator';

const ValidationFactory = (type) => {
	switch (type) {
		case "year":
			return validateYear;
		case 'title':
			return validateTitle;
		case 'plot':
			return validatePlot;
		case 'url':
			return validateUrl;
		default:
			console.warn("Dose not supported validation type.")
	}
};

const validateTitle = (value) => {
	if (value.length > 50) {
		return {type : ERROR, message : "Should not be more than 50 characters"};
	}

	return {type:NONE, message:""};
};

const validateYear = (value) => {
	const currentYear = new Date().getFullYear();
	if (value.length < 4) {
		return {type : ERROR, message : "Year must be in YYYY format"};
	}

	if (value.length > 4) {
		return {type : ERROR, message : "Invalid Year"};
	}

	if (currentYear < parseInt(value)) {
		return {type : ERROR, message : "Year must be past year"}
	}

	return {type:NONE, message:""};
};

const validatePlot = (value) => {
	if (value.length < 100) {
		return {type : ERROR, message : "Plot can be minimum 100 characters."};
	}

	if (value.length > 500) {
		return {type : ERROR, message : "Plot should not be more than 500 characters."};
	}

	return {type:NONE, message:""};
};

const validateUrl = (value) => {
	if (!validator.isURL(value)) {
		return {type : ERROR, message : "Please enter valid URL."};
	}

	return {type:NONE, message:""};
};

 const checkInitValidation = (value, currentState, callBack, VType) => {
	if (value === '') {
		if (currentState.dirty) {
			callBack({...currentState, value, error:{type:ERROR, message:"Should not be empty."}, dirty:true});
		}
		return false;
	}
	callBack({...currentState, value, error : ValidationFactory(VType)(value), dirty:true});
};

export default checkInitValidation
