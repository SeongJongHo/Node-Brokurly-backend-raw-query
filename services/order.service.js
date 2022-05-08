const {orderDao} = require('../models/dao');

const getOrder = async(user)=>{
    const order = await orderDao.getOrderDao(user)
    console.log(order)
    return order
}
const addOrder = async(user, cart_id, t)=>{
    const order = await orderDao.addOrderDao(user, cart_id, t)

    return order
}
const updateOrder = async(order_id)=>{        
    const order = await orderDao.updateOrderDao(order_id)

    return order
}
module.exports = {
    getOrder,
    addOrder,
    updateOrder,
}