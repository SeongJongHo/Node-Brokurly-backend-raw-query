const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../config/config.js').SECRET_KEY;
const ALGORITHM = require('../config/config.js').ALGORITHM;
const db = require('../models')

module.exports = {
    login_required : (req, res, next)=>{
        if(req.headers.authorization){
            const payload = jwt.verify(req.headers.authorization, SECRET_KEY, ALGORITHM)

            db.User.findOne({where: {id: payload.id}})
                .then(result=>{
                    if(result){
                        req.user = result.id
                        next()
                    }else{
                        return res.status(401).json({
                            message: 'INVALID_USER'
                        })
                    }
                })
        }
        else{
            return res.status(401).json({
                message: 'INVALID_TOKEN'
            })
        }
    }
}
