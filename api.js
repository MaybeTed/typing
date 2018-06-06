const User = require('./db/user');

module.exports = function(router) {
	router.post('/register', (req, res) => {
		const user = new User();
		user.username = req.body.username;
		user.password = req.body.password;
		user.email = req.body.email;
		if (req.body.username === null || req.body.username === '' || req.body.password === null || req.body.password === '' || req.body.email === null || req.body.email === '') {
			res.json({ success: false, message: 'Must provide username, email, and password' });
		} else {
			user.save(function(err) {
				if (err) {
					if (err.errors) {
						if (err.errors.username) {
							res.json({ success: false, message: err.errors.username.message });
						} else if (err.errors.email) {
							res.json({ success: false, message: err.errors.email.message });
						} else if (err.errors.password) {
							res.json({ success: false, message: err.errors.password.message });
						} else {
							res.json({ success: false, message: err });
						}
					} else {
						if (err.code === 11000) {
							res.json({ success: false, message: 'Username or email already taken' });
						} else {
							res.json({ success: false, message: err });
						}
					}
				} else {
					res.json({ success: true, message: 'user added to database' });
				}
			});
		}
	});

	return router;
}