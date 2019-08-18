import React, { useState } from 'react';
import { ERROR, NONE, WARNING } from './ErrorTypes';
import './Input.scss';
const style = {
	inputContainer: {
		position: 'relative'
	},
	inputField: {
		padding: 10,
		borderRadius: 5,
		border: '2px solid #CFD8DC'
	},
	actionMsg: {
		display: 'flex',
		fontWeight: 'bold',
		fontSize: 20,
		error: {
			color: 'red'
		},
		warning: {
			color: 'green',
			fontWeight: 'bold'
		}
	},
	actionButton: {
		position: 'absolute',
		right: 0,
		top: 0,
		color: '#fff',
		height: 40,
		cursor: 'pointer',
		userSelect: 'none',
		borderLeft: '1px solid #CFD8DC',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#90A4AE',
		borderRadius: '0px 5px 5px 0px'
	}
};

const Input = (props) => {
	const [ text, setText ] = useState('');

	const {
		type = 'text',
		name = '',
		size = '35',
		error = { type: NONE, message: '' },
		placeHolder = 'User name',
		actionBtn
	} = props;

	const { icon = '', show = false, handler = () => {} } = actionBtn;
	const errStyle = (type) => {
		switch (type) {
			case ERROR:
				return style.actionMsg.error;
			case WARNING:
				return style.actionMsg.error;
			default:
				return '';
		}
	};

	const onActionBtnClick = () => {
		handler(text);
	};

	const onInputFieldChange = (event) => {
		setText(event.target.value);
	};

	return (
		<div style={style.inputContainer}>
			{/**
				Input filed 
			*/}
			<input
				type={type}
				name={name}
				style={style.inputField}
				placeholder={placeHolder}
				size={size}
				onChange={onInputFieldChange}
			/>

			{/**
				Error message filed 
			*/}
			{error.type !== NONE && (
				<div style={style.actionMsg}>
					<span style={errStyle(error.type)}>{error.message}</span>
				</div>
			)}

			{/**
				Action button 
			*/}
			{show && (
				<button className="actionButtons" style={style.actionButton} onClick={onActionBtnClick}>
					<i className="material-icons">{icon}</i>
				</button>
			)}
		</div>
	);
};
export default Input;
