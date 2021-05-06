const Ajv = require('ajv').default;
const ajv = new Ajv({ allErrors: true });

module.exports = {
	validate: (schema, data) => {
		let validate = ajv.compile(schema);
		let err = null;
		let isValid = validate(data);
		if (!isValid) {
			err = new Error('Invalid data for schema');
			Error.captureStackTrace(err, validate);
			err.errors = errors(validate);
		}

		let output = { err, isValid };
		return output;
	},
};

const errors = (validate) => {
	let output = validate.errors.map((err) => {
		if (err.keyword == 'additionalProperties') {
			return {
				field: err.params.additionalProperty,
				message: 'This is is not a valid field, should not be part of request',
			};
		}
		if (err.keyword == 'required') {
			return {
				field: err.params.missingProperty,
				message: 'This is a required field. It is missing from request',
			};
		}

		return {
			field: err.dataPath ? err.dataPath : err.instancePath,
			message: err.message,
			// params: err.params,
		};
	});

	return output;
};
