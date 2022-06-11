const mongoose = require('mongoose');
const Joi = require('joi');

// sub-document
const OrderedProduct = new mongoose.Schema(
	{
		product_id: { type: String, required: true },
		times: { type: Number, required: true },
	},
	{ _id: false, versionKey: false }
);

const OrderSchema = new mongoose.Schema(
	{
		user_id: { type: String, required: true },
		products: { type: [OrderedProduct] },
	},
	{ versionKey: false }
);

const Order = mongoose.model('orders', OrderSchema);

const validateOrder = (data) => {
	const schema = Joi.object({
		user_id: Joi.string().required().label('User id'),
		products: Joi.array()
			.items(
				Joi.object({
					product_id: Joi.string().required().label('Product id'),
					times: Joi.number().required().label('Times'),
				})
			)
			.required()
			.label('Products'),
	});
	return schema.validate(data);
};

module.exports = { Order, validateOrder };
