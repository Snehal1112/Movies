import React from 'react';
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
	const {
		type = 'text',
		size = '35',
		error = { type: NONE, message: '' },
		placeHolder = 'User name',
		actionBtn = { icon: '', show: false, handler: () => {} }
	} = props;

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
	return (
		<div style={style.inputContainer}>
			{/**
				Input filed 
			*/}
			<input type={type} style={style.inputField} placeholder={placeHolder} size={size} />

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
			{actionBtn.show && (
				<button className="actionButtons" style={style.actionButton} onClick={actionBtn.handler}>
					<i className="material-icons">{actionBtn.icon}</i>
				</button>
			)}
		</div>
	);
};
export default Input;
