const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const passwordComplexity = require('joi-password-complexity');

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false }
);

UserSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.PRIVATEKEY, {
		expiresIn: '7d',
	});
	return token;
};

const User = mongoose.model('users', UserSchema);

const validateUser = (data) => {
	const schema = Joi.object({
		name: Joi.string().required().label('Name'),
		email: Joi.string().email().required().label('Email'),
		password: passwordComplexity().required().label('Password'),
	});
	return schema.validate(data);
};

const validateLogin = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label('Email'),
		password: passwordComplexity().required().label('Password'),
	});
	return schema.validate(data);
};

module.exports = { User, validateUser, validateLogin };
