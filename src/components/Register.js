import React from 'react';

class Register extends React.Component {
	render() {
		return (
			<div className="register">
				<div className="page-header">
					<h1>User Registration</h1>
				</div>

				<form>
					<div>
						<label>Username:</label>
						<input type="text" name="name" placeholder="please enter username" required />
					</div>
					<br />
					<div>
						<label>Email:</label>
						<input type="text" name="email" placeholder="please enter email" required />
					</div>
					<br />
					<div>
						<label>Password:</label>
						<input type="password" name="firstPassword" placeholder="please enter password" required />
					</div>
					<br />
					<div>
						<label>Confirm Password:</label>
						<input type="password" name="confirmPassword" placeholder="please enter password" required />
					</div>
					<br />
					<button type="submit">Register</button>
				</form>
			</div>
		)
	}
}

export default Register;
