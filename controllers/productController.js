const db = require('../models');

module.exports = {
    getProducts : (req, res)=>{
        let Menu = ['채소','샐러드','과일','간편식']
        let Category = ['쌈채소', '간편채소', '닭가슴살', '오늘의 샐러드', '야채 샐러드', '제철과일', '국산과일', '수입과일', '선식', '샌드위치', '시리얼' ]
        
        if(req.query.category) Category = req.query.category;
        if(req.query.menu) Menu = req.query.menu;
        
        db.Product.findAll({
            include:[{
                model: db.Category,
                attributes:['id','name'],
                where:{
                    name : Category
                },
                include: {
                    model: db.Menu,
                    attributes:['id','name'],
                    where:{
                        name: Menu
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