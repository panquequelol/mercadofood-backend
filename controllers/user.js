const { User, validateUser, validateLogin } = require('../models/User');
// const router = require('express').Router();
const bcrypt = require('bcrypt');

const register = async (req, res) => {
	const { error } = validateUser(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const user = await User.findOne({ email: req.body.email });
	if (user)
		return res
			.status(409)
			.send({ message: 'User with given email already exists' });

	const salt = await bcrypt.genSalt(Number(process.env.SALT));
	const hashPassword = await bcrypt.hash(req.body.password, salt);

	await User.create({ ...req.body, password: hashPassword });
	res.status(201).send({ message: 'User created successfully' });
};

const login = async (req, res) => {
	const { error } = validateLogin(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const user = await User.findOne({ email: req.body.email });
	if (!user)
		return res.status(401).send({ message: 'Invalid email or password' });

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword)
		return res.status(401).send({ message: 'Invalid Email or Password' });

	const token = user.generateAuthToken();
	res.cookie('username', user.name);
	res.cookie('usertoken', token).send({ message: 'Logged in successfully' });
};

const logout = (req, res) => {
	res.clearCookie('usertoken');
	res.clearCookie('username');
	res.status(200).json({ message: 'Logged out' });
};

module.exports = { register, login, logout };
