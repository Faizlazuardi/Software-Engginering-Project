const db = require("../config/db");

exports.findByEmail = async (email) => {
	const result = await db.query("SELECT * FROM msuser WHERE useremail = $1", [
		email,
	]);
	return result.rows[0];
};

exports.findById = async (userId) => {
	const result = await db.query("SELECT * FROM msuser WHERE userid = $1", [
		userId,
	]);
	return result.rows[0];
};

exports.createUser = async (username, email, hash, dob) => {
	const result = await db.query(
		"INSERT INTO msuser (username, useremail, userpassword, userdob, userrole) VALUES ($1, $2, $3, $4, $5) RETURNING userid",
		[username, email, hash, dob, "customer"],
	);
	return result.rows[0];
};

exports.updateUser = async (userId, updateData) => {
	const { username, email, dob } = updateData;
	const result = await db.query(
		"UPDATE msuser SET username = $1, useremail = $2, userdob = $3 WHERE userid = $4 RETURNING *",
		[username, email, dob, userId],
	);
	return result.rows[0];
};

exports.updatePassword = async (userId, newPasswordHash) => {
	await db.query("UPDATE msuser SET userpassword = $1 WHERE userid = $2", [
		newPasswordHash,
		userId,
	]);
};

exports.deleteUser = async (userId) => {
	await db.query("DELETE FROM msuser WHERE userid = $1", [userId]);
};

exports.getAllUsers = async () => {
	const result = await db.query(
		"SELECT userid, username, useremail, userdob, userrole FROM msuser",
	);
	return result.rows;
};

exports.updateRole = async (userId, role) => {
	const result = await db.query(
		"UPDATE msuser SET userrole = $1 WHERE userid = $2 RETURNING *",
		[role, userId],
	);
	return result.rows[0];
};

exports.countUsers = async () => {
	const result = await db.query("SELECT COUNT(*) FROM msuser");
	return Number.parseInt(result.rows[0].count);
};

exports.searchUsers = async (searchTerm) => {
	const result = await db.query(
		"SELECT userid, username, useremail, userdob, userrole FROM msuser WHERE username ILIKE $1 OR useremail ILIKE $1",
		[`%${searchTerm}%`],
	);
	return result.rows;
};
