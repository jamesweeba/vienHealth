module.exports = {
	signupSchema: {
		type: 'object',
		properties: {
			first_name: { type: 'string', minLength: 2, maxLength: 50 },
			last_name: { type: 'string', minLength: 2, maxLength: 50 },
			email: { type: 'string', minLength: 2, pattern:"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"},
			password: { type: 'string', minLength: 6 },
		},
		additionalProperties: false,
		required: ['first_name', 'last_name', 'email', 'password'],
	},
	loginSchema: {
		type: 'object',
		properties: {
			username: { type: 'string', minLength: 2, maxLength: 50 , pattern:"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"},
			password: { type: 'string', minLength: 2 },
		},
		additionalProperties: false,
		required: ['username', 'password'],
	},
};
