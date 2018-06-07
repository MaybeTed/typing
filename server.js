const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();
const appRoutes = require('./api')(router);
const secret = require('./config.js');
const session = require('express-session');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	secret: secret,
	saveUninitialized: true,
	resave: false,
	cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));
app.use(express.static(path.join(__dirname + '/dist')));
app.use('/api', appRoutes);


mongoose.connect('mongodb://localhost:27017/typing', (err) => {
	if (err) {
		console.log('Not connected to the database: ', err);
	} else {
		console.log('successfully connected to MongoDB');
	}
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(port, () => {
	console.log('Server is listening on port: ', port);
});

