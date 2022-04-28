const {cartService} = require('../services');

module.exports= {
    getCart: async(req, res, next)=>{
        try{
            const result = await cartService.getCart(req.user)

            return res.status(200).json({message: 'success', result: result})
        }
        catch(err){
            return res.status(err.status || 400).json({message: err.message || 'error'})
        }
    },
    addCart: async(req, res)=>{
        try{
            if(!req.body.product_id)return res.status(400).json({message: "BAD_REQUEST"})

            const result = await cartService.addCart(req.user, req.body.product_id, req.body.quantity)

            return res.status(200).json({message: 'success', result: result})
        }
        catch(err){
            return res.status(err.status || 400).json({message: err.message || 'error'})
        }  
    },
    updateCart: (req, res)=>{
        if(!req.body)return res.status(400).json({message: "BAD_REQUEST"})
        try{
            const result = await cartService.updateCart(req.user, req.body.cart_id, req.body.quantity)

            return res.status(200).json({message: 'success', result: result})
        }
        catch(err){
            return res.status(err.status || 400).json({message: err.message || 'error'})
        }
    },
    deleteCart: (req, res)=>{
        try{
            if(!req.body)return res.status(400).json({message: "BAD_REQUEST"})

            const result = await cartService.addCart(req.user, req.body.cart_id)

            return res.status(200).json({message: 'success', result: result})
        }
        catch(err){
            return res.status(err.status || 400).json({message: err.message || 'error'})
        }
    }
}