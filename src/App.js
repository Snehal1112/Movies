import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import MainViewport from './container/core/MainViewport';
import Login from './container/loginform/Login';
import { store } from './store';

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					{/* TODO: reduce code duplication of render function  */}
					<Route
						exact
						path="/"
						render={(routeProps) => {
							const isLogin = sessionStorage.getItem('isLogin');
							return isLogin === 'true' ? <Redirect to="/dashboard" /> : <Login {...routeProps} />;
						}}
					/>
					<Route
						path="/dashboard"
						render={(routeProps) => {
							const isLogin = sessionStorage.getItem('isLogin');
							return isLogin === 'true' ? <MainViewport {...routeProps} /> : <Redirect to="/" />;
						}}
					/>
					<Route component={Login} />
				</Switch>
			</BrowserRouter>
		</Provider>
	);
};
export default App;
