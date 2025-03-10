import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, //MS
		httpOnly: true, // security measure to protect against cross-site scripting (XSS) attacks.
		sameSite: "strict", //security by preventing Cross-Site Request Forgery (CSRF) attacks.
		secure: process.env.NODE_ENV !== "development",
	});
};