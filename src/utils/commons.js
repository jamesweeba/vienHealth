const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
// const { PhoneNumberUtil } = require('google-libphonenumber');
// const phoneUtil = PhoneNumberUtil.getInstance();

module.exports = {
	hashUserPassword: (plainPassword) => {
		let hashedPassword = bcrypt.hashSync(plainPassword, 10);
		return hashedPassword;
	},

	jwtGenerator: (payload) => {
		let jwtToken = jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' });
		return jwtToken;
    }
    
}
