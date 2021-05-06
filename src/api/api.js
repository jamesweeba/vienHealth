const mg = require('../utils/database');

module.exports = {
	transaction: (client, param) => {
		let { statusCode, res, token,result } = param;
		switch (statusCode) {
			case 200:
				res.status(statusCode).json(result);
				mg.close(client);
				return;
			case 403:
				res.status(403).send('Already available');
				mg.close(client);
				return;
			case 400:
				res.status(400).send(result || 'Bad Request');
				mg.close(client);
				return;
			case 404:
				res.status(404).send('Not found');
				mg.close(client);
				return;

			default:
				res.status(500).send('Internal server error');
				mg.close(client);
				return;
		}
	},
};
