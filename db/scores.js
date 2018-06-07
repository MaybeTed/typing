const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ScoresSchema = new Schema({
	username: { type: String, required: true },
	email: { type: String },
	score: { type: Number, required: true },
	date: { type: Number, required: true}
});



module.exports = mongoose.model('Scores', ScoresSchema);
