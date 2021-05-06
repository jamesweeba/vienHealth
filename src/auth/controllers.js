const mongoDb = require('../utils/database');
const api = require('../api/api');
const services = require('./services');
const base64 = require('base-64');
const passwordValidation = require('../utils/passwordValidation');
const { jwtGenerator } = require('../utils/commons');
const users = require('../users/service');

module.exports = {
	createUser: (req, res) => {
		let dbConnection = null;
		let user = req.body;
		mongoDb
			.connect()
			.then((client) => {
				dbConnection = client;
				let email = { email: user.email };
				return users.searchUser(client, email);
			})
			.then((result) => {
				if (!result) {
					return services.createUsers(dbConnection, user);
				}
				return null;
			})
			.then((result) => {
				if (!result) {
					let param = { statusCode: 400, res };
					api.transaction(dbConnection, param);
					return;
				}

				let param = { statusCode: 200, result, res };
				api.transaction(dbConnection, param);
			})
			.catch((err) => {
				console.log(err);
				let param = { statusCode: 500, res };
				if (err.statusCode == 400) {
					let result = err.message;
					{
						param = { statusCode: err.statusCode, result, res };
					}
				}
				api.transaction(dbConnection, param);
			});
	},

	login: (req, res) => {
		let dbConnection = null;
		let request = { authorization: req.headers.authorization };

		mongoDb
			.connect()
			.then((client) => {
				dbConnection = client;
				let encryptedAuth = request.authorization;
				let splitEncryption = encryptedAuth.split(' ')[1];
				let emailAndPassword = base64.decode(splitEncryption).split(':');
				let username = emailAndPassword[0];
				let password = emailAndPassword[1];
				request.username = username;
				request.password = password;
				delete request.authorization;
				return services.login(client, request);
			})
			.then((result) => {
				if (!result) {
					return null;
				}
				return result;
			})
			.then((result) => {
				let param = { password: request.password, result };
				return passwordValidation.validateDatePassword(param);
			})
			.then((result) => {
				let param = { statusCode: 404, res };

				if (result) {
					let token = jwtGenerator(result);
					result = { ...result, token };
					param = { statusCode: 200, result, res };
				}
				api.transaction(dbConnection, param);
				return;
			})
			.catch((err) => {
				console.log(err);
				let param = { statusCode: 500, res };
				if (!err || err.statusCode == 400) {
					let result = !err ? 'Wrong user name or password' : err.message;
					param = { statusCode: 400, result, res };
				}
				api.transaction(dbConnection, param);
			});
	},
};
