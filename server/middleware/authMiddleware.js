const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) return res.status(403).json({ message: "Token missing" });

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch {
		res.status(401).json({ message: "Invalid token" });
	}
};

exports.handleJsonErrors = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ message: "Invalid JSON format in request body" });
    }
    next(err);
};