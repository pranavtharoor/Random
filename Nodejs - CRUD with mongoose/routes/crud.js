const express = require('express');
const router = express.Router();
const Person = require('../models/person');

router.post('/create', (req, res) =>  {
	
	var newPerson = new Person({
		idno: req.body.idno,
		name: req.body.name,
		age: req.body.age
	});

	newPerson.save((err, person) => {
		if(err) {
			res.json({success: false, msg: 'Failed to create record for person'});
		} else {
			res.json({success: true, msg: 'Record created'});
		}
	});

});

router.get('/read', (req, res) =>  {

	Person.find({})
	.exec((err, people) => {
		if(err) {
			res.send('Failed to find people');
		} else {
			res.json(people);
		}
	});

});

router.get('/read/:idno', (req, res) => {

	Person.findOne({
		idno: req.params.idno
	})
	.exec((err, person) => {
		if(err) {
			res.send('Failed to find person');
		} else {
			res.json(person);
		}
	});

});

router.put('/update/:idno', (req, res) => {

	Person.findOneAndUpdate(
		{idno: req.params.idno},
		{
			$set: {
				idno: req.body.idno,
				name: req.body.name,
				age: req.body.age
			}
		},
		{upsert: true},
		(err, newPerson) => {
			if(err) {
				res.send('Failed to update record');
				res.status(500);
			} else {
				res.send('Record updated');
				res.status(204);
			}
		}
	);

});

router.delete('/delete/:idno', (req, res) => {

	Person.findOneAndRemove({idno: req.params.idno}, (err) => {
		if(err) {
			res.send('Failed to delete record');
			res.status(500);
		} else {
			res.send('Deleted Record');
			res.status(204);

		}
	});

});

module.exports = router;