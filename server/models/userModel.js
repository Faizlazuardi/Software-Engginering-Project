const db = require("../config/db");

exports.findByEmail = async (email) => {
	const result = await db.query("SELECT * FROM msuser WHERE useremail = $1", [
		email,
	]);
	return result.rows[0];
};

exports.createUser = async (username, email, hash, dob) => {
	await db.query(
		"INSERT INTO msuser (username, useremail, userpassword, userdob, userrole) VALUES ($1, $2, $3, $4, $5)",
		[username, email, hash, dob, "customer"],
	);
};
