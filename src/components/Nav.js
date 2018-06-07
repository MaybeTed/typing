import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Actions from '../actions'

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}
}

class Nav extends React.Component {

	logout() {
		axios.get('/api/logout')
			.then(() => {
				Actions.fetchUser();
			})
	}

	render() {
		if (this.props.auth && this.props.auth.success) {
			return (
				<ul className="nav-links">
					<li><Link to="/">Home</Link></li>
					<li><Link to={`/profile/${this.props.auth.user.username}`}>Profile</Link></li>
					<li onClick={this.logout}>Logout</li>
				</ul>
			)
		} else {
			return (
				<ul className="nav-links">
					<li><Link to="/">Home</Link></li>
					<li><Link to="/login">Login</Link></li>
					<li><Link to="/register">Register</Link></li>
				</ul>
			)
		}
	}
}

export default connect(mapStateToProps)(Nav);
