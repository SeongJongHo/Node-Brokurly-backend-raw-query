const {cartDao} = require('../models/dao');

const getCart = async(user)=>{
    
    const cart = await cartDao.getCartDao(user)

    return cart
}
const addCart = async(user, product_id, quantity)=>{
    
    const cart = await cartDao.addCartDao(user, product_id, quantity)

    return cart
}
const updateCart = async(user, cart_id)=>{

    const cart = await cartDao.updateCartDao(user, cart_id)

    return cart
}
const deleteCart = async(user, cart_id)=>{

    const cart = await cartDao.deleteCartDao(user, cart_id)

    return cart
}

module.exports= {
    getCart,
    addCart,
    updateCart,
    deleteCart,
}