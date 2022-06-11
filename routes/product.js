const router = require('express').Router();
const controller = require('../controllers/product');
const adminAuth = require('../config/adminAuth');

router.post('/', adminAuth, controller.createProduct);
router.get('/sale', controller.getProductsOnSale);
router.get('/:id', controller.getProduct);
router.put('/:id', adminAuth, controller.updateProduct);
router.delete('/:id', adminAuth, controller.deleteProduct);
router.get('/category/:category', controller.getCatergoryProducts);

module.exports = router;
