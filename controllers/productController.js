const db = require('../models');

module.exports = {
    getProducts : (req, res)=>{
        const Menu = req.query.menu? req.query.menu : [1,...4]
        const Category = req.query.category? req.query.category : [1,...11];
        
        db.Product.findAll({
            include:[{
                model: db.Category,
                attributes:['id','name'],
                where:{
                    id : Category
                },
                include: {
                    model: db.Menu,
                    attributes:['id','name'],
                    where:{
                        id: Menu
                    }
                },
                },{
                model: db.Image,
                attributes: ['url']
                }
            ]
        }).then(result=>{
            res.status(200).json({
                result: result,
                message: "success"
            })
        })
    },

    getProduct: (req, res)=>{
        db.Product.findOne({
            where:{
                id: req.params.id
            },
            include:[{
                model: db.Image, attributes: ['url']
            }]
        }).then(result=>{
            if(result){
                return res.status(200).json({
                    result: result,
                    message: "success"
                })
            }
            return res.status(404).json({
                message: "Invalid Product id"
            })
        })
    }
}