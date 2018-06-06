const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const validate = require('mongoose-validator');

const usernameValidator = [
	validate({
		validator: 'matches',
		arguments: /^[a-zA-Z0-9_]*$/,
		message: 'Must be only letters, numbers, and underscores'
	}),
	validate({
		validator: 'isLength',
		arguments: [3,11],
		message: 'Must be between 3-11 characters'
	})
];

const emailValidator = [
	validate({
		validator: 'isEmail',
		message: 'Is not a valid email'
	})
];

const passwordValidator = [
	validate({
		validator: 'matches',
		arguments: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{5,20}$/,
		message: 'Password must contain lowercase, uppercase, number, and special character. Password must be between 5-20 characters'
	})
];

const UserSchema = new Schema({
	username: { type: String, required: true, unique: true, validate: usernameValidator },
	email: { type: String, required: true, unique: true, validate: emailValidator },
	password: { type: String, required: true, validate: passwordValidator }
});

UserSchema.pre('save', function(next) {
	var user = this;
	bcrypt.hash(user.password, null, null, (err, hash) => {
		if (err) return next(err);
		user.password = hash;
	});
	next();
});

module.exports = mongoose.model('User', UserSchema);
