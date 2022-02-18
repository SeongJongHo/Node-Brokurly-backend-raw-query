const express = require('express');
const router = express.Router();
const ProductCtrl = require('../controllers/productController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Product */
router.get('/products', ProductCtrl.getProducts)

module.exports = router;
