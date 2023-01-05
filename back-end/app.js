// DEPENDENCIES
const cors = require('cors');
const express = require('express');

// CONFIGURATION
const app = express();
const studentsController = require('./Controllers/studentsController.js');

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use('/students', studentsController);

app.get("/", (req,res) => {
    res.send("Hello world")
})


module.exports = app;
