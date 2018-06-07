import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Nav from './Nav';

class App extends React.Component {
	render() {
		return (
			<div>
				<Nav />
				<Switch>
					<Route exact path="/" render={() => (<Home />)} />
					<Route path="/register" render={() => (<Register />)} />
					<Route path="/login" render={() => (<Login />)} />
				</Switch>
			</div>
		)
	}
}

export default App;
