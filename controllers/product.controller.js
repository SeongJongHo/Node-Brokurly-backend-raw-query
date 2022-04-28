const {productService} = require('../services')

const getProducts = (req, res)=>{
    try{
        const menu = req.query.menu? req.query.menu : [1,...4]
        const category = req.query.category? req.query.category : [1,...11];            
        const result = productService.getProduct(menu, category)

        return res.status(200).json({message: 'success', result: result}) 
    }
    catch(err){
        return res.status(err.status || 400).json({message: err.message || 'error'})
    }
}
const getProduct = async(req, res)=>{
    try{
        if(!req.params.id) throw {status: 400, message: 'id is is necessary'}

        const result = await product.getProduct(req.params.id)

        return res.status(200).json({message: 'success', result: result}) 
    }
    catch(err){
        return res.status(err.status || 400).json({message: err.message || 'error'})
    }
}
module.exports = {
    getProducts,
    getProduct,
}