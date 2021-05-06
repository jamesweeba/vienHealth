const bcrypt = require('bcrypt');
module.exports={
 validateDatePassword:(param)=> {
	return new Promise((resolve, reject) => {
		let { password, result } = param;
		if (!result) {
			return resolve(null);
		}
		let passwordMatch = bcrypt.compareSync(password, result.password);
		if (!passwordMatch) {
			return reject(null);
		}
		delete result.password;
		return resolve(result);
	});
}
}
    