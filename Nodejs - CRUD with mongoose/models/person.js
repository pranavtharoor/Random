const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
	idno: {
		type: String,
		required: true
	},
	name: {
		type: String
	},
	age: {
		type: String
	}
});

const Person = module.exports = mongoose.model('Person', personSchema);