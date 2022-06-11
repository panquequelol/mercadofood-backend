const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
	const decoded = jwt.verify(req.cookies.usertoken, process.env.PRIVATEKEY);

	if (decoded._id === process.env.ADMIN_ID) {
		console.log('👀Performing admin action');
		next();
	} else {
		return res.status(401).send({ message: 'Not authorized' });
	}
};

module.exports = adminAuth;
