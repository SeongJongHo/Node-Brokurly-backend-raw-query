const express = require('express');
const router = express.Router();
const ProductCtrl = require('../controllers/productController');
const login_required = require('../core/userCertification').login_required;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Product */
router.get('/products', ProductCtrl.getProducts)
router.get('/product/:id', ProductCtrl.getProduct)

module.exports = router;
