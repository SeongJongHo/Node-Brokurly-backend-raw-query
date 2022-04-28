const db = require('../models');

module.exports= {
    getCart: async(user)=>{

        const cart = await db.Cart.findAll({
            where: {user_id: user},
            include:{
                model: db.Product,
                include: {
                    model: db.Image,
                    attributes: ['url']
                }
            }
        }).catch((err)=>{
            throw {status: 400, message: err.message}
        })

        return cart
    },
    addCart: async(user, product_id, quantity)=>{
        const [cart, created] = await await db.Cart.findOrCreate({
            where: {
                user_id: user,
                product_id: product_id
            },
            defaults: {
                quantity: quantity
              }
        }).catch((err)=>{
            throw {status: 400, message: err.message}
        })

        if(created){
            return cart
        }
        else{
            cart.quantity += quantity;
            await cart.save()

            return cart
        }
    },
    updateCart: async(user, cart_id)=>{
        const cart = await db.Cart.update({
            quantity: req.body.quantity
        },{
        where: {
            id: req.body.cart_id,
            user_id: user
            }
        }).catch((err)=>{
            throw {status: 400, message: err.message}
        })

        return cart
    },
    deleteCart: async(user, cart_id)=>{
        const cart = await db.Cart.destroy({
            where: {
                id: req.body.cart_id
            }
        }).catch((err)=>{
            throw {status: 400, message: err.message}
        })

        if(cart[0]>0) return cart
        else throw {status: 400, message: 'not deleted cart'}
    }
}