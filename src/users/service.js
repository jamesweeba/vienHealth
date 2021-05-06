const mongoDb = require('../utils/database');

module.exports = {
	createUsers: (client, request) => {
		return new Promise((resolve, reject) => {
			mongoDb.db(client)
				.then((db) => {
					return db;
				})
				.then((db) => {
					return db.collection('users').insertOne(request);
				})
				.then((result) => {
					return resolve(result.ops[0]);
				})
				.catch((err) => {
					console.log(err);
					return reject();
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
};
