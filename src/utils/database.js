let { MongoClient } = require('mongodb');
let dbClient = null;
let config = require('../config/config');

module.exports = {
	init: async () => {
		try {
			const client = await MongoClient.connect(`mongodb://${config.databaseHost}:${config.databasePort}`);
			dbClient = client;
		} catch (err) {
			console.log(err);
		}
	},

	connect: () => {
		return new Promise((resolve) => {
			MongoClient.connect(`mongodb://${config.databaseHost}:${config.databasePort}`)
				.then((client) => {
					dbClient = client;
					return resolve(dbClient);
				})
				.catch((err) => {
					console.log(err);

					return reject(new Error(err));
				});
		});
	},

	db: (client) => {
		return new Promise((resolve, reject) => {
			try {
				const db = client.db('mong');
				return resolve(db);
			} catch (err) {
				console.log(err);
				return reject(err);
			}
		});
	},

	close: (client) => {
		client.close();
	},
};
