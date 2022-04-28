const {orderService} = require('../services')

const getOrder = (req, res)=>{
    try{
        const result = await orderService.getOrder(req.user)

        return res.status(200).json({message: 'success', result: result}) 
    }
    catch(err){
        return res.status(err.status || 400).json({message: err.message || 'error'})
    }
}
const addOrder = async(req, res)=>{
    const t = await db.sequelize.transaction();
    try{
        if(!req.body.email) throw {status: 400, message: 'email is is necessary'}

        const result = await orderService.addOrder(req.user, cart_id, t)
        
        if(result){
            return res.status(200).json({message: 'success'}) 
        }
    }
    catch(err){
        await t.rollback()
        return res.status(err.status || 400).json({message: err.message || 'error'})
    }
}
const updateOrder = async(req, res)=>{
    try{
        if(!req.body.email) throw {status: 400, message: 'email is is necessary'}

        const result = await orderService.updateOrder(req.body.order_id)

        if(result){
            return res.status(200).json({message: 'success'}) 
        }
    }
    catch(err){
        return res.status(err.status || 400).json({message: err.message || 'error'})
    }
}
module.exports = {
    getOrder,
    addOrder,
    updateOrder,
}