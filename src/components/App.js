import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Nav from './Nav';
import Profile from './Profile';

class App extends React.Component {
	render() {
		return (
			<div>
				<Nav />
				<Switch>
					<Route exact path="/" render={() => (<Home />)} />
					<Route path="/register" render={() => (<Register />)} />
					<Route path="/login" render={() => (<Login />)} />
					<Route path="/profile/:username" render={(props) => (<Profile {...props}/>)} />
				</Switch>
			</div>
		)
	}
}

export default App;
