import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			user: false
		}
	}

	renderLinks() {
		if (this.state.user) {
			return (
				<ul>
					<li>Home</li>
					<li>Logout</li>
				</ul>
			)
		} else {
			return (
				<ul>
					<Link to="/"><li>Home</li></Link>
					<Link to="/login"><li>Login</li></Link>
					<Link to="/register"><li>Register</li></Link>
				</ul>
			)
		}
	}

	render() {
		return (
			<div>
				{this.renderLinks()}
				<div>Home</div>
			</div>
		)
	}
}

export default Home;
