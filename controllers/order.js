const { Order, validateOrder } = require('../models/Order');
const jwt = require('jsonwebtoken');

const createOrder = async (req, res) => {
	try {
		// decode jwt to get id of logged user
		const decoded = jwt.verify(req.cookies.usertoken, process.env.PRIVATEKEY);

		const { error } = validateOrder({ ...req.body, user_id: decoded._id });
		if (error) return res.status(400).send({ message: error.details[0].message });

		try {
			const order = await Order.create({ ...req.body, user_id: decoded._id });
			res.status(201).json(order);
		} catch (e) {
			return res.status(500).send({ message: 'internal error' });
		}
	} catch (e) {
		return res.status(400).send({ message: e });
	}
};

const getOrdersByUserId = async (req, res) => {
	const orders = await Order.find({ user_id: req.params.id });
	res.status(201).json(orders);
};

module.exports = { createOrder, getOrdersByUserId };
