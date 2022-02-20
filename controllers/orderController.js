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

module.exports = {
    getOrder: (req, res)=>{
        db.Order.findAll({
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
        }).then(result =>{
            if(result.length == 0) throw new Error("ORDER_NOT_EXIST")

            return res.status(200).json({
                result: result,
                message: 'SUCCESS'
            });
        }).catch(error=>{
            return res.status(400).json({
                message: error.message,
            });
        })
    },
    addOrder: async(req, res)=>{
        const t = await db.sequelize.transaction();

        try {
            if(!req.body)return res.status(400).json({message: 'BODY_NOT_EXIST'})
            
            const cart= await db.Cart.findAll({where: {id: req.body.cart_id}}, { transaction: t })
            if(cart.length < 1) throw new Error('INVALID_CART');

            await db.Cart.destroy({where:{id:req.body.cart_id}}, { transaction: t })
                .catch(()=>{ throw new Error('NOT_DELETED_CART')})
                
            const order = await db.Order.create({
                order_number: uuid(),            
                order_status_id: orderStatus.WAIT_DEPOSIT,           
                users_id: req.user
            }, { transaction: t })
                .catch(()=>{ throw new Error('NOT_CREATED_ORDER')})

            const orderItem = await cart.map(Item=>({
                    product_id: Item.product_id,
                    quantity: Item.quantity,
                    order_id: order.id,
                    order_items_status_id: orderStatus.WAIT_DEPOSIT,
                    tracking_number: uuid()
            }))
            await db.OrderItem.bulkCreate(orderItem, { transaction: t })
                .catch(()=>{ throw new Error('NOT_CRETED_ORDERITEM')})
            
            await t.commit()

            return res.status(201).json({
                message: 'SUCCESS'
            })
        }catch(err){

            await t.rollback()
            return res.status(400).json({
                message: err.message
            })
        }
    },
    updateOrder: (req, res)=>{
        if(!req.body)return res.status(400).json({message: 'BODY_NOT_EXIST'})
        
        db.Order.update({order_status_id: orderStatus.ORDER_CANCELLATION},{where: {id: req.body.order_id}})
            .then(result=>{
                if(result[0]>0){
                    return res.status(200).json({
                        message: 'SUCCESS'
                    })
                }
                throw new Error("NOT_UPDATED")
            }).catch(err=>{
                return res.status(400).json({
                    message: err.message
                })
            })
    }
}