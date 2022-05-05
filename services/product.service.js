const {productDao} = require('../models/dao');

const getProducts = async(menu, category)=>{
    const products = await productDao.getProductsDao(menu, category)

    return products
}
const getProduct = async(id)=>{
    const products = await productDao.getProductsDao(id)

    return products
}
module.exports = {
    getProducts,
    getProduct
}