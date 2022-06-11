const { Product, validateProduct } = require('../models/Product');

const createProduct = async (req, res) => {
	const { error } = validateProduct(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const item = await Product.create(req.body);
	res.status(201).json(item);
};

const getProduct = async (req, res) => {
	try {
		const item = await Product.findOne({ _id: req.params.id });
		res.status(201).json(item);
	} catch (e) {
		res.status(400).send({ message: e });
	}
};

const getCatergoryProducts = async (req, res) => {
	const items = await Product.find({ category: req.params.category });
	res.status(201).json(items);
};

const getProductsOnSale = async (req, res) => {
	const items = await Product.find({ sale: { $exists: true } });
	res.status(201).json(items);
};

const updateProduct = async (req, res) => {
	const { error } = validateProduct(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const item = Product.findByIdAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(201).json(item);
};

const deleteProduct = (req, res) => {
	const result = Product.deleteOne({ _id: req.params.id });
	res.status(201).json(result);
};

module.exports = {
	createProduct,
	getProduct,
	getCatergoryProducts,
	updateProduct,
	deleteProduct,
	getProductsOnSale,
};
