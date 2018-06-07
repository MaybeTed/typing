import React from 'react';
import axios from 'axios';

class Leaders extends React.Component {
	constructor() {
		super();
		this.state = {
			leaders: []
		}
	}

	componentDidMount() {
		axios.get('/api/leaders')
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
							  		<td>{person.username}</td>
							  		<td>{person.score}</td>
							  	</tr>
							  )
						  })
						  }
					  	</tbody>
				    </table>
				</div>
			)
		}
		return null;
	}
}

export default Leaders;
