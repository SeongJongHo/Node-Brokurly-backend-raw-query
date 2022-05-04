const dao = require('../models/dao')

const test = async(req, res)=>{
    try{
        const db = await dao.cartDao.getCartDao(req.body.id, req.body.product_id, req.body.quantity)
    return res.status(200).json({result: db})
    }
    catch (e){
        res.status(400).json({message:e.message})
    }
    

}
module.exports={test}