const mysql = require('mysql-await');

class Context {
	constructor() {
		this.pool = mysql.createPool({
			connectionLimit: 10,
			host: process.env.BDD_HOST,
			user: process.env.BDD_USERNAME,
			password: process.env.BDD_PASS,
			database: process.env.BDD_DATABASE,
		});
		console.log('Pool created');
	}
}

module.exports = new Context();