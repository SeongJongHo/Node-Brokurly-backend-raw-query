const jwt = require('jsonwebtoken');
const {SECRET_KEY, ALGORITHM} = require('../config/config.js')

const signToken = async(user)=>{
    const token = jwt.sign({id:user}, SECRET_KEY, {algorithm:ALGORITHM});

    return token
}
const verifyToken = (authorization)=>{
    let userId
    jwt.verify(authorization, SECRET_KEY, ALGORITHM,
        (err, decoded)=>{
            if(!err) {
                userId = decoded.id? decoded.id:false;
            }
            else {
                throw {status: 401, message: 'invalid token'}
            }                     
        }
    )
    return userId
}

module.exports = {
    signToken,
    verifyToken,
}



