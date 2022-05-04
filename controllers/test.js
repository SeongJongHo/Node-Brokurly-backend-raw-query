const dao = require('../models/dao')

const testCart = async(req, res)=>{
    try{
        const menu = req.query.menu? req.query.menu : [1,2,3,4]
        const category = req.query.category? req.query.category : [1,2,3,4,5,6,7,8,9,10,11]; 
        const db = await dao.productDao.getProducts(menu, category)
    return res.status(200).json({result: db})
    }
    catch (e){
        res.status(400).json({message:e.message})
    }
}
const testUser = async(req, res)=>{
    try{
    //     username,
    // email   ,
    // password,
    // address ,
    // name    ,
    // contact ,
        const db = await dao.userDao.addUserDao(req.body.username,req.body.email,req.body.password,req.body.address,req.body.name,req.body.contact)
    return res.status(200).json({result: db})
    }
    catch (e){
        res.status(400).json({message:e.message})
    }
}
const testOrder = async(req, res)=>{
    try{

        const db = await dao.orderDao.getOrderDao(menu, category)
    return res.status(200).json({result: db})
    }
    catch (e){
        res.status(400).json({message:e.message})
    }
}
const testProduct = async(req, res)=>{
    try{
        const menu = req.query.menu? req.query.menu : [1,2,3,4]
        const category = req.query.category? req.query.category : [1,2,3,4,5,6,7,8,9,10,11]; 
        const db = await dao.productDao.getProducts(menu, category)
    return res.status(200).json({result: db})
    }
    catch (e){
        res.status(400).json({message:e.message})
    }
}
module.exports={
    testProduct,
    testCart,
    testOrder,
    testUser
}