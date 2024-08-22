const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = async (req, res, next) => {
	// console.log(req.headers.authorization,"auth")
	if (!req.headers.authorization) {
		return res.send("Please Login Again");
	}
	const token = req.headers.authorization;
	await jwt.verify(token, "secret", function(err, decoded) {
		if (err) {
			// console.log(err);
			res.send("Please Login");
		} else {
			req.body.userEmail = decoded.userId;
			next();
		}
	});
};

module.exports = { authentication };