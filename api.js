const User = require('./db/user');
const Scores = require('./db/scores');
const secret = require('./config');
const session = require('express-session');

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
							if (err.errmsg.includes('email')) {
								res.json({ success: false, message: 'Email already taken' });
							} else {
								res.json({ success: false, message: 'Username already taken' });
							}
						} else {
							res.json({ success: false, message: err });
						}
					}
				} else {
					req.session.user = {
						username: user.username,
						email: user.email
					}
					res.json({ success: true, message: 'user added to database', username: user.username, email: user.email });
				}
			});
		}
	});

	router.post('/login', (req, res) => {
		User.findOne({ email: req.body.email }).select('email username password').exec(function(err, user) {
			if (err) throw err;

			if (!user) {
				res.json({ success: false, message: 'Could not find an account with that email address' });
			} else if (user) {
				if (req.body.password) {
					var validPassword = user.comparePassword(req.body.password);
				} else {
					res.json({ success: false, message: 'No password provided' });
				}
				
				if (!validPassword) {
					res.json({ success: false, message: 'Incorrect password' });
				} else {
					req.session.user = {
						username: user.username,
						email: user.email
					}
					res.json({ success: true, message: 'User authenticated' });
				}
			}
		});
	});

	router.get('/getUser', (req, res) => {
		if (req.session.user) {
			res.json({ success: true, user: req.session.user });
		} else {
			res.json({ success: false, message: 'No user' });
		}
	});

	router.get('/logout', (req, res) => {
		req.session.destroy();
		res.end();
	});

	router.post('/postScore', (req, res) => {
		const score = new Scores();
		score.username = req.body.username;
		if (req.body.email) {
			score.email = req.body.email;
		}
		score.score = req.body.score;
		score.date = Date.now();
		score.save();
		res.end();
	});

	router.get('/leaders', (req, res) => {
		let limit = 10;
		if (req.query.more === 'more') {
			limit = 25;
		}
		Scores.find().sort({ 'score': -1 }).limit(limit).exec(function(err, results) {
			if (err) throw err;
			res.json({ leaders: results });
		});
	});

	router.get('/profile', (req, res) => {
		const { name } = req.query;
		Scores.find({ username: name }).exec(function(err, results) {
			if (err) throw err;
			res.json({ scores: results });
		});
	});



	return router;
}