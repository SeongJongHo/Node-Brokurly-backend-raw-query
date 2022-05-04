const db = require('../models/sequelize');

const getProducts = async(menu, category)=>{
    const products = await db.Product.findAll({
        include:[{
            model: db.Category,
            attributes:['id','name'],
            where:{
                id : category
            },
            include: {
                model: db.Menu,
                attributes:['id','name'],
                where:{
                    id: menu
                }
            },
            },{
            model: db.Image,
            attributes: ['url']
            }
        ]
    }).catch((err)=>{
        throw {status: 400, message: err.message}
    })

    return products
}
const getProduct = async(id)=>{
    const product = await db.Product.findOne({
        where:{
            id: id
        },
        include:[{
            model: db.Image, attributes: ['url']
        }]
    }).catch((err)=>{
        throw {status: 400, message: err.message}
    })

    return product
}
module.exports = {
    getProducts,
    getProduct
}