const {productDao} = require('../models/dao');

const getProducts = async(menu, category)=>{
    const products = await productDao.getProductsDao(menu, category)

    return products
}
const getProduct = async(id)=>{
    const product = await productDao.getProductDao(id)

    return product
}
module.exports = {
    getProducts,
    getProduct
}