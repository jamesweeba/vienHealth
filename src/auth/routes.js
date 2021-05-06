const express = require('express');
const controller = require('./controllers');

const router = express.Router();

router.post('/registration', controller.createUser);

router.post('/login',controller.login);

module.exports = router;
