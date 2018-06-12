import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Leaders extends React.Component {
	constructor() {
		super();
		this.state = {
			leaders: []
		}
	}

	componentWillReceiveProps() {
		this.getLeaders();
	}

	getLeaders(more) {
		axios.get(`/api/leaders?more=${more}`)
			.then((response) => {
				this.setState({ leaders: response.data.leaders });
			})
	}

	render() {
		if (this.state.leaders.length) {
			return (
				<div className="leaderboard">
				    <h3>All Time Best Scores</h3>
				    <table>
					  	<tbody>
						  	<tr>
						  		<th>Name</th>
						  		<th>Words</th>
						  	</tr>
						  {this.state.leaders.map((person, i) => {
							  return (
							  	<tr key={i}>
							  		<td><Link to={`/profile/${person.username}`}>{person.username}</Link></td>
							  		<td>{person.score}</td>
							  	</tr>
							  )
						  })
						  }
					  	</tbody>
				    </table>
				    {this.state.leaders.length < 11 ? 
				    	<button onClick={() => this.getLeaders('more')} className="more-leaders-button">More...</button>
				    	:
				    	null
					}
				</div>
			)
		}
		return null;
	}
}

export default Leaders;
