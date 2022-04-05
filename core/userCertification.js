const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../config/config.js').SECRET_KEY;
const ALGORITHM = require('../config/config.js').ALGORITHM;
const db = require('../models')

module.exports = {
    login_required : async(req, res, next)=>{
        try{
            if(req.headers.authorization){
                const payload = {}
                jwt.verify(req.headers.authorization, SECRET_KEY, ALGORITHM,
                    (err, decoded)=>{
                        if(!err) {
                            payload.id = decoded.id
                        }
                        else {
                            throw new jwt.JsonWebTokenError('INVALID_TOKEN')
                        }                     
                    }
                )
                await db.User.findOne({where: {id: payload.id}})
                    .then(result=>{
                        if(result){
                            req.user = result.id
                            next()
                        }
                        else {
                            throw new Error('INVALID_USER')
                        }
                    }).catch(()=>{
                        throw new Error('INVALID_USER')
                    })
            }
            else {
                throw new Error('INVALID_AUTHORIZATION')
            }
        }
        catch(err){
            if(err.message=='INVALID_AUTHORIZATION'){
                return res.status(401).json({message: err.message, name: err.name})
            }
            return res.status(401).json({message: err.message, name: err.name})
        }
    }
}
