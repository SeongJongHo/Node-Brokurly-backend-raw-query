const {productService} = require('../services')

const getProducts = async(req, res)=>{
    try{
        const menu = req.query.menu? req.query.menu : [1,2,3,4]
        const category = req.query.category? req.query.category : [1,2,3,4,5,6,7,8,9,10,11]; 
        const result = await productService.getProducts(menu, category)

        return res.status(200).json({message: 'success', result: result[0]}) 
    }
    catch(err){
        return res.status(err.status || 400).json({message: err.message || 'error'})
    }
}
const getProduct = async(req, res)=>{
    try{
        if(!req.params.id) throw {status: 400, message: 'id is is necessary'}
        
        const result = await productService.getProduct(req.params.id)

        return res.status(200).json({message: 'success', result: result[0]}) 
    }
    catch(err){
        return res.status(err.status || 400).json({message: err.message || 'error'})
    }
}
module.exports = {
    getProducts,
    getProduct,
}