const db = require('../models/sequelize')
const {verifyToken} = require('../utils/token.util')

const login_required = async(req, res, next)=>{
    try{
        if(req.headers.authorization){
            const userId = verifyToken(req.headers.authorization)
            await db.User.findOne({where: {id: userId}})
                .then(result=>{
                    if(result){
                        req.user = result.id
                        next()
                    }
                    else {
                        throw {status:401, message: 'invalid user'}
                    }
                }).catch(()=>{
                    throw {status:401, message: 'invalid user'}
                })
        }
        else {
            throw {status:401, message: 'invalid authorization'}
        }
    }
    catch (e){
        res.status(e.status || 401).json({message:e.message || 'err'})
    }
}

module.exports = {
    login_required,
}
