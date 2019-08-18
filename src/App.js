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
					<Route
						exact
						path="/"
						render={(routeProps) => {
							let isLogin = routeProps.location.state && routeProps.location.state.log === true;
							return isLogin === true ? <Redirect to="/dashboard" /> : <Login {...routeProps} />;
						}}
					/>
					<Route path="/dashboard" component={MainViewport} />
					<Route component={Login} />
				</Switch>
			</BrowserRouter>
		</Provider>
	);
};
export default App;
