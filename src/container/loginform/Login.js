import React, { PureComponent } from 'react';
import { NONE } from '../../components/formfields/ErrorTypes';
import Input from '../../components/formfields/Input';
import config from '../../config';
import {ERROR} from "../utils/ErrorTypes";

const style = {
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: 'inherit'
	}
};

class Login extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			value:'',
			error: {type:NONE, message:''}
		}
	}
	onClickButton = async (e) => {
		e.preventDefault();
		const apiKey = this.state.value;
		if (apiKey === '') {
			this.setState({error:{type:ERROR, message:'User name should not be empty'}});
			return;
		}

		try {
			const response = await fetch(`${config.rootUrl}apikey=${apiKey}&s=batman`);
			const data = await response.json();
			if (data.Response === 'False') {
				sessionStorage.setItem('isLogin', false);
				sessionStorage.setItem('apiKey', null);
				this.setState({error:{type:ERROR, message:'API key is invalid.'}});
			} else {
				// 49e882e5
				sessionStorage.setItem('apiKey', apiKey);
				config.apiKey = apiKey;
				sessionStorage.setItem('isLogin', true);
				console.log('API Key validated.');
			}
		} catch (e) {
			sessionStorage.setItem('isLogin', false);
			sessionStorage.setItem('apiKey', null);
			this.setState({error:{type:ERROR, message:'Either server not reachable or API key is invalid.'}});
		}
		const { history } = this.props;
		history.push('/');
	};

	render() {
		console.log(this.state)
		return (
			<div style={style.container}>
				<form onSubmit={this.onClickButton}>
					<Input
						type="text"
						name="username"
						value={this.state.value}
						actionBtn={{
							icon: 'vpn_key',
							show: true
						}}
						onInputChange={(value)=>this.setState({...this.state, value})}
						error={this.state.error}
					/>
				</form>
			</div>
		);
	}
}

export default Login;
