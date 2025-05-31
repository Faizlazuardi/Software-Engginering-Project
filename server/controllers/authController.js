const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await userModel.findByEmail(email);
        
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isValidPassword = await bcrypt.compare(password, user.userpassword);

        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { 
                userId: user.userid, 
                email: user.useremail,
                role: user.userrole 
            },
            process.env.JWT_SECRET || 'fallback-secret-key',
            { expiresIn: "24h" }
        );

        const userData = {
            id: user.userid,
            username: user.username,
            email: user.useremail,
            role: user.userrole
        };

        res.status(200).json({
            message: "Login success",
            token: token,
            user: userData
        });

    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
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
        
        const userId = await userModel.createUser(username, email, hash, dob);

        res.status(201).json({ 
            message: "User created",
            userId 
        });
    } catch (error) {
        res.status(500).json({ message: "Registration failed" });
    }
};