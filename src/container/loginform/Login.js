import React, { Component } from 'react';
import { NONE } from '../../components/formfields/ErrorTypes';
import Input from '../../components/formfields/Input';
const style = {
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: 'inherit'
	},
	btn: {
		height: 20
	}
};

class Login extends Component {
	onClickButton = (e) => {
		e.preventDefault();
		this.props.history.push('/dashboard', { log: true });
	};

	render() {
		return (
			<div style={style.container}>
				<form onSubmit={this.onClickButton}>
					<Input
						type="text"
						actionBtn={{
							icon:'vpn_key',
							show: true
						}}
						error={{ type: NONE, message: 'sddds' }}
					/>
				</form>
			</div>
		);
	}
}
export default Login;
