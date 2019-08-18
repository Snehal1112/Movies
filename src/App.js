import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import MainViewport from './container/core/MainViewport';
import Login from './container/loginform/Login';

const App = () => {
	return (
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
				<Route
					path="/dashboard"
					component={MainViewport}
					// children={({ match, ...rest }) => {
					// 	return <Route exact path={`${match.path}`} component={MovileList} />;
					// }}
				/>
				<Route component={Login} />
			</Switch>
		</BrowserRouter>
	);
};
export default App;
