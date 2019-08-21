import React, { useState, useEffect } from 'react';
import { ERROR, NONE, WARNING } from './ErrorTypes';
import './Input.scss';
const style = {
	inputContainer: {
		position: 'relative'
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
	inputField: {
		margin:5,
		padding: 10,
		borderRadius: 5,
		width:'100%',
		border: '2px solid #CFD8DC'
	}
};

const TextArea = (props) => {
	const [ text, setText ] = useState('');

	const {
		type = 'text',
		name = '',
		value = text,
		error = { type: NONE, message: '' },
		placeHolder = 'User name',
		row = 2,
		onInputChange = () => {},
	} = props;

	useEffect(() => {
		onInputChange(text);
	},[text]);

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
			<textarea
				type={type}
				name={name}
				rows={row}
				style={style.inputField}
				placeholder={placeHolder}
				value={value}
				onChange={({target}) => setText(target.value)}
			/>

			{/**
			 Error message filed
			 */}
			{error.type !== NONE ? (
				<div style={style.actionMsg}>
					<span style={errStyle(error.type)}>{error.message}</span>
				</div>
			):""}
		</div>
	);
};
export default TextArea;
