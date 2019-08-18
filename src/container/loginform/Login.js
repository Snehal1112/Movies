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

		try {
			const response = await fetch(`http://www.omdbapi.com/?apikey=49e882e5&s=batman`);
			const data = await response.json();
			if (data.Response === 'False') {
				sessionStorage.setItem('isLogin', false);
				console.log('Error: Please check API key.');
			} else {
				sessionStorage.setItem('apiKey', '49e882e5');
				config.apiKey = '49e882e5';
				sessionStorage.setItem('isLogin', true);
				console.log('API Key validated.');
			}
		} catch (e) {
			sessionStorage.setItem('isLogin', false);
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
						actionBtn={{
							icon: 'vpn_key',
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
