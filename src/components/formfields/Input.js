import React, { useState, useEffect } from 'react';
import { ERROR, NONE, WARNING } from './ErrorTypes';
import './Input.scss';
const style = {
	inputContainer: {
		position: 'relative'
	},
	inputField: {
		margin:5,
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
			color: '#ffff00',
			fontWeight: 'bold'
		}
	},
	actionButton: {
		position: 'absolute',
		margin: 5,
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
		value = text,
		readOnly = false,
		size = '35',
		error = { type: NONE, message: '' },
		placeHolder = 'User name',
		onFocus = ()=>{},
		onBlur = ()=>{},
		onClick = ()=>{},
		onInputChange = ()=>{},
		actionBtn = {},
	} = props;

	useEffect(() => {
		onInputChange(text);
	},[text]);

	const { icon = '', show = false, handler = () => {} } = actionBtn;
	const errStyle = (type) => {
		switch (type) {
			case ERROR:
				return style.actionMsg.error;
			case WARNING:
				return style.actionMsg.warning;
			default:
				return '';
		}
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
				value={value}
				onClick={onClick}
				onFocus={onFocus}
				onBlur={onBlur}
				onChange={({target}) => setText(target.value)}
				readOnly={readOnly}
		/>

			{/**
				Error message filed 
			*/}
			{error.type !== NONE ? (
				<div style={style.actionMsg}>
					<span style={errStyle(error.type)}>{error.message}</span>
				</div>
			):""}

			{/**
				Action button 
			*/}
			{show && (
				<button className="actionButtons" style={style.actionButton} onClick={() => handler(text)}>
					<i className="material-icons">{icon}</i>
				</button>
			)}
		</div>
	);
};
export default Input;
