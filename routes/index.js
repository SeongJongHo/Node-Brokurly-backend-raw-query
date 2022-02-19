const express = require('express');
const router = express.Router();
const ProductCtrl = require('../controllers/productController');
const CartCtrl = require('../controllers/cartController');
const login_required = require('../core/userCertification').login_required;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Product */
router.get('/products', ProductCtrl.getProducts)
router.get('/product/:id', ProductCtrl.getProduct)

/* Cart */
router.get('/cart', login_required, CartCtrl.getCart)
router.post('/cart', login_required, CartCtrl.addCart)
router.patch('/cart', login_required, CartCtrl.updateCart)
router.delete('/cart', login_required, CartCtrl.deleteCart)



module.exports = router;
