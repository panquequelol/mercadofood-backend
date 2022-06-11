const mongoose = require('mongoose');

module.exports = () => {
	try {
		mongoose.connect(process.env.URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('🚀Connected to DB');
	} catch (e) {
		console.log(e);
		console.log('❌Could not connect to DB');
	}
};

