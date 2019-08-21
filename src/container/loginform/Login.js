import React, { PureComponent } from 'react';
import { NONE } from '../../components/formfields/ErrorTypes';
import Input from '../../components/formfields/Input';
import config from '../../config';

const style = {
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: 'inherit'
	}
};

class Login extends PureComponent {
	onClickButton = async (e) => {
		e.preventDefault();
		const apiKey = e.target['username'].value;
		if (apiKey === '') {
			alert('user name should not be empty');
			return;
		}

		try {
			const response = await fetch(`${config.rootUrl}apikey=${apiKey}&s=batman`);
			const data = await response.json();
			if (data.Response === 'False') {
				sessionStorage.setItem('isLogin', false);
				sessionStorage.setItem('apiKey', null);
				alert('Error: Please check API key.');

				console.error('Error: Please check API key.');
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
			alert('Error: Please check API key.');
			console.error('Error: Please check API key.');
		}
		const { history } = this.props;
		history.push('/');
	};

	render() {
		return (
			<div style={style.container}>
				<form onSubmit={this.onClickButton}>
					<Input
						type="text"
						name="username"
						actionBtn={{
							icon: 'vpn_key',
							show: true
						}}
						error={{ type: NONE, message: '' }}
					/>
				</form>
			</div>
		);
	}
}

export default Login;
