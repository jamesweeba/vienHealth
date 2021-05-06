const express = require('express');
const app = express();
const port=require('./config/config').port

const mongodb = require('./utils/database');
const { startApp } = require('./core/route');


mongodb.init();
startApp(app);

app.listen(port, () => {
	console.log('magic happens on port ' + port);
});

module.exports = app;
