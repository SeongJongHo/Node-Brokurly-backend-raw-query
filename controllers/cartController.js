const db = require('../models');

module.exports= {
    getCart: (req, res, next)=>{

        db.Cart.findAll({
            where: {user_id: req.user},
            include:{
                model: db.Product,
                include: {
                    model: db.Image,
                    attributes: ['url']
                }
            }
        }).then(result=>{
            if(result){
                return res.status(200).json({
                    message: 'SUCCESS',
                    result : result
                })
            }
        })
    },
    addCart: async(req, res)=>{
        if(!req.body.product_id)return res.status(400).json({message: "BAD_REQUEST"})

        const [cart, created] = await db.Cart.findOrCreate({
            where: {
                user_id: req.user,
                product_id: req.body.product_id
            },
            defaults: {
                quantity: req.body.quantity
              }
        })
        if(created){
            return res.status(201).json({
                message: 'CREATED',
                result: cart
            })
        }
        else{
            cart.quantity += req.body.quantity;
            cart.save().then(result=>{
                return res.status(200).json({
                    message: 'SUCCESS',
                    result: result
                })
            })
        }
    },
    updateCart: (req, res)=>{
        if(!req.body)return res.status(400).json({message: "BAD_REQUEST"})

        db.Cart.update({
            quantity: req.body.quantity
        },{
        where: {
            id: req.body.cart_id,
            }
        }).then(result=>{
            return res.status(200).json({
                message: 'SUCCESS',
            })
        }).catch(err=>{
            if(err){
                return res.status(400).json({
                    message: 'INVALID_CART',
                })
            }
        })
    },
    deleteCart: (req, res)=>{
        if(!req.body)return res.status(400).json({message: "BAD_REQUEST"})

        db.Cart.destroy({
            where: {
                id: req.body.cart_id
            }
        }).then(result=>{
            return res.status(200).json({
                message: 'SUCCESS',
                result: result
            })
        })
    }
}