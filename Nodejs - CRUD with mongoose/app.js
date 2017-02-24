const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const crud = require('./routes/crud');
const config = require('./config/database');
const app = express();
const port = 3000;

mongoose.Promise = global.Promise;
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
	console.log('Connected to database ' + config.database);
});
mongoose.connection.on('error', (err) => {
	console.log('Failed to connect to database\nError: ' + err);
});

app.use(bodyParser.json());
app.use('/crud', crud);

app.listen(port, () => {
	console.log('Started server at ' + port);
});