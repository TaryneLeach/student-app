const express = require('express');
const controller = express.Router();

const studentData = require('./studentData.json');

controller.get('/hello', (req, res) => {
	res.send('Hello from the students controller!');
});

// get all students
controller.get('/', (req, res) => {
	res.json(studentData);
});

// get a single student with ID
controller.get('/students/:id', (req, res) => {
	// find one student by their id
	const { id } = req.params;
	try {
		// if id is not all digits
		if (!/0-9/g.test(id)) {
			console.log('this aint digits!');
			throw 'Student ID must be all digits';
		}
		// send an error message to only use digits
		const student = studentData.students.find((student) => student.id === id);
		if (!student) {
			throw 'There are no student with this id';
		}

		res.json(student);
	} catch (err) {
		res.status(500).send(err);
	}
});

controller.get('/:startId/:limit', (req, res) => {
	const { startId, limit } = req.params;

	// find the index of the student with startId
	const studentArray = studentData.students;
	const firstStudentIndex = studentArray.findIndex(
		(student) => student.id === startId
	);
	console.log(firstStudentIndex);
	const selectedStudents = studentArray.slice(
		firstStudentIndex,
		Number(firstStudentIndex) + Number(limit)
	);

	res.json(selectedStudents);
});

module.exports = controller;
