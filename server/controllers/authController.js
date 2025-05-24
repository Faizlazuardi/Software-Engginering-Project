const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res
				.status(400)
				.json({ message: "Email and password are required" });
		}

		const user = await userModel.findByEmail(email);
		if (!user) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const isPasswordValid = await bcrypt.compare(password, user.userpassword);
		if (!isPasswordValid) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const token = jwt.sign(
			{ id: user.userid, role: user.userrole },
			process.env.JWT_SECRET,
			{ expiresIn: "1d" },
		);

		res.json({
			message: "Login success",
			token,
		});
		
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({ message: "Login failed. Please try again later." });
	}
};

exports.register = async (req, res) => {
	try {
		const { username, email, password, dob } = req.body;

		if (!username || !email || !password || !dob) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const existingUser = await userModel.findByEmail(email);
		if (existingUser) {
			return res.status(409).json({ message: "Email already registered" });
		}

		const hash = await bcrypt.hash(password, 10);
		await userModel.createUser(username, email, hash, dob);
		res.status(201).json({ message: "User created" });
	} catch (error) {
		console.error("Registration error:", error);
		res
			.status(500)
			.json({ message: "Registration failed. Please try again later." });
	}
};
