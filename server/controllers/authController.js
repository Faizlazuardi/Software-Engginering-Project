const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
	const { email, password } = req.body;
	const user = await userModel.findByEmail(email);
	if (!user || !(await bcrypt.compare(password, user.userpassword))) {
		return res.status(401).json({ message: "Invalid credentials" });
	}
	const token = jwt.sign({ id: user.userid }, process.env.JWT_SECRET, {
		expiresIn: "1d",
	});
	res.json({ message: "Login success", token });
};

exports.register = async (req, res) => {
	const { username, email, password, dob } = req.body;
	const hash = await bcrypt.hash(password, 10);
	await userModel.createUser(username, email, hash, dob);
	res.status(201).json({ message: "User created" });
};
