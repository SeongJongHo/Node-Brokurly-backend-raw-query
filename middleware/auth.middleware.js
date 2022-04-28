const db = require('../models')
const {verifyToken} = require('../utils/token.util')

const login_required = async(req, res, next)=>{
    if(req.headers.authorization){
        const userId = await verifyToken(req.headers.authorization)

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
        throw {status:401, message: 'invalid user'}
    }
}

module.exports = {
    login_required,
}
