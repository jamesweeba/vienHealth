const mongoDb = require('../utils/database');
const { hashUserPassword, jwtGenerator } = require('../utils/commons');
const validations = require('../utils/validations').validate;
const schema = require('./schema');
const users = require('../users/service');

module.exports = {
	createUsers: (client, request) => {
		return new Promise((resolve, reject) => {
			mongoDb
				.db(client)
				.then((Db) => {
					return Db;
				})
				.then((Db) => {
					let signupSchema = schema.signupSchema;
					let status = validations(signupSchema, request);
					if (!status.isValid) {
						return reject({ statusCode: 400, message: status.err.errors });
					}
					let password = hashUserPassword(request.password);
					request.password = password;
					return Db.collection('users').insertOne(request);
				})
				.then((result) => {
					let token;
					if (result) {
						delete result.ops[0].password;
						token = jwtGenerator(result.ops[0]);
						return resolve({ ...result.ops[0], token });
					}
				})
				.catch((err) => {
					console.log(err);
					return reject(err);
				});
		});
	},

	searchUser: function (client, request) {
		return new Promise((resolve, reject) => {
			mongoDb
				.db(client)
				.then((Db) => {
					return Db;
				})
				.then((Db) => {
					return Db.collection('users').findOne(request);
				})
				.then((result) => {
					return resolve(result);
				})
				.catch((err) => {
					console.log(err);
					return reject(err);
				});
		});
	},
	login: (client, request) => {
		return new Promise((resolve, reject) => {
			let loginSchema = schema.loginSchema;
			let status = validations(loginSchema, request);
			if (!status.isValid) {
				return reject({ statusCode: 400, message: status.err.errors });
			}
			let email = { email: request.username };
			users
				.searchUser(client, email)
				.then((result) => {
					return resolve(result);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	},
};
