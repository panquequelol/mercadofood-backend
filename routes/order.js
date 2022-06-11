const router = require('express').Router();
const controller = require('../controllers/order');

router.post('/', controller.createOrder);
router.get('/:id', controller.getOrdersByUserId);

module.exports = router;
