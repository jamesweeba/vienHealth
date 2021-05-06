const express = require('express');
const app = express();

const mongodb = require('./utils/database');
const { startApp } = require('./core/route');


mongodb.init();
startApp(app);

module.exports = app;
