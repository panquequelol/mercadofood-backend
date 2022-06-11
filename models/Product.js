const mongoose = require('mongoose');
const Joi = require('joi');

const ProductSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		packageSize: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		sale: {
			type: Number,
			min: 1,
			max: 99,
		},
	},
	{ versionKey: false }
);

const Product = mongoose.model('products', ProductSchema);

const validateProduct = (data) => {
	const schema = Joi.object({
		name: Joi.string().min(3).max(255).required().label('Name'),
		price: Joi.number().min(1).required().label('Price'),
		description: Joi.string().required().label('Description'),
		packageSize: Joi.string().max(255).required().label('Package Size'),
		category: Joi.string().max(255).required().label('Category'),
		image: Joi.string().required().label('Image'),
		sale: Joi.number().min(1).max(100).required().label('Sale Percentage'),
	});
	return schema.validate(data);
};

module.exports = { Product, validateProduct };
