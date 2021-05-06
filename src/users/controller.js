const mg = require('../utils/database');
const service = require('./service');
const api = require('../api/api');

module.exports = {
	createUser: (req, res) => {
		mg.connect()
			.then((client) => {
				let request = req.body;
				service
					.createUsers(client, request)
					.then((result) => {
						let param = { statusCode: 200, result, res };
						api.transaction(client, param);
					})
					.catch((err) => {
						client;
						console.log(err);
					});
			})
			.catch((err) => {
				client;
				console.log(err);
			});

		//res.status(200).json({ name: 1 });
	},

	getAUser: (req, res) => {
		let dbConnection = null;
		mg.connect()
			.then((client) => {
				let request = { authorization: req.headers.authorization };
				dbConnection = client;
				let encryptedAuth = request.authorization;
				let splitEncryption = encryptedAuth.split(' ')[1];
				let emailAndPassword = base64.decode(splitEncryption).split(':');
				let username = emailAndPassword[0];
				let email = { email: username };
				return service.searchUser(email);
			})
			.then((result) => {
				let param = { statusCode: 200, result, res };
				api.transaction(dbConnection, param);
			})
			.catch((err) => {
				console.log(err);
				let param = { statusCode: 500, res };
				api.transaction(dbConnection, param);
				// console.log(err);
			});
	},
};
