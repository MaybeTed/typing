import React from 'react';
import { connect } from 'react-redux';
import Actions from '../actions/index';
import LineChart from './LineChart';

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		user: state.user
	}
}

class Profile extends React.Component {
	constructor() {
		super();
	}

	componentDidMount() {
		Actions.populateProfile(this.props.match.params.username);
	}

	averageScore() {
		return Math.round(this.props.user.scores.reduce((total, item) => {
			return total += item.score;
		}, 0) / this.props.user.scores.length);
	}

	topScore() {
		let max = this.props.user.scores[0].score;
		for (var i = 1; i < this.props.user.scores.length; i++) {
			if (this.props.user.scores[i].score > max) {
				max = this.props.user.scores[i].score;
			}
		}
		return max;
	}

	render() {
		if (this.props.user.scores && this.props.user.scores.length) {
			return (
				<div>
					<header className="profile-header">
						<ul>
							<li>{this.props.user.scores[0].username}</li>
							<li>Top Score: {this.topScore()}</li>
							<li>Average Score: {this.averageScore()}</li>
						</ul>
					</header>
					<LineChart data={this.props.user.scores}/>
				</div>
			)
		} else {
			return <h3 className="no-scores-msg">{this.props.match.params.username} doesn't exist or doesn't have any scores yet.</h3>
		}
	}
}

export default connect(mapStateToProps)(Profile);
