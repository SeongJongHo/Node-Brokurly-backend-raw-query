const db = require('../models');
const uuid = require('uuid').v4;
const orderStatus= {
    WAIT_DEPOSIT       : 1,   
    COMPLETION_DEPOSIT : 2,    
    READY_RELEASE      : 3,  
    SHIPMENT_COMPLETE  : 4,
    DELIVERED          : 5,
    DELAYED_DELIVERY   : 6,
    DELIVERY_COMPLETED : 7,
    ORDER_COMPLETE     : 8,
    ORDER_CANCELLATION : 9
}

const getOrder = (user)=>{
    const order = await db.Order.findAll({
        where: {
            users_id: req.user
        },
        include: {
            model: db.OrderStatus,
            model: db.OrderItem,
            include:{
                model: db.OrderItemStatus,
                model: db.Product,
                include:{
                    model: db.Image,
                    attributes: ['url']
                }
            }
        }
    }).catch((err)=>{
        throw {status: 400, message: err.message}
    })

    return order
}
const addOrder = async(user, cart_id, t)=>{
    const cart= await db.Cart.findAll({where: {id: cart_id}}, { transaction: t })
    if(cart.length < 1) throw {status:400, message: 'invalid cart'}

    await db.Cart.destroy({where:{id: cart_id}}, { transaction: t })
        
    const order = await db.Order.create({
        order_number: uuid(),            
        order_status_id: orderStatus.WAIT_DEPOSIT,           
        users_id: user
    }, { transaction: t })
        .catch((err)=>{ throw {status:400, message: err.message}})

    const orderItem = await cart.map(Item=>({
            product_id: Item.product_id,
            quantity: Item.quantity,
            order_id: order.id,
            order_items_status_id: orderStatus.WAIT_DEPOSIT,
            tracking_number: uuid()
    }))
    await db.OrderItem.bulkCreate(orderItem, { transaction: t })
        .catch(()=>{ throw {status:400, message: err.message}})
    
    await t.commit()

    return true
}
const updateOrder = async(order_id)=>{        
    const order = db.Order.update({order_status_id: orderStatus.ORDER_CANCELLATION},{where: {id: order_id}})
        .catch(()=>{ throw {status:400, message: err.message}})

    if(result[0]>0) return true
    else throw {status:400, message: 'not updated'}
}
module.exports = {
    getOrder,
    addOrder,
    updateOrder,
}