const express = require('express');
const router = express.Router();
const ProductCtrl = require('../controllers/product.controller');
const CartCtrl = require('../controllers/cart.controller');
const OrderCtrl = require('../controllers/order.controller');
const {login_required}= require('../middleware/auth.middleware');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Product */
router.get('/products', ProductCtrl.getProducts)
router.get('/product/:id', ProductCtrl.getProduct)

// /* Cart */
router.get('/cart', login_required, CartCtrl.getCart)
router.post('/cart', login_required, CartCtrl.addCart)
router.patch('/cart', login_required, CartCtrl.updateCart)
router.delete('/cart', login_required, CartCtrl.deleteCart)

/* Order */
router.get('/order', login_required, OrderCtrl.getOrder)
router.post('/order', login_required, OrderCtrl.addOrder)
router.patch('/order', login_required, OrderCtrl.updateOrder)

module.exports = router;