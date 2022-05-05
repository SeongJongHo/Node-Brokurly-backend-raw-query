const bcrypt = require('bcrypt');
const {userDao} = require('../models/dao');
const validate = require('../utils/validator.util');
const {signToken} = require('../utils/token.util')

const checkEmail = async(email)=>{
    const user = await userDao.checkEmailUserDao(email)
    
    if(user) throw {status:400, message: 'email exist'}
    
    return user??true
}
const checkUsername = async(username)=>{
    const user = await userDao.getUserDao(username)
    
    if(user) throw {status:400, message: 'username exist'}
    
    return user??true
}
const signUp = async(
    username,
    email   ,
    password,
    address ,
    name    ,
    contact ,)=>{
        validate.validates_email(email)
        validate.validates_password(password)
        validate.validates_username(username)
        
        const user = await userDao.addUserDao(
            username,
            email   ,
            password,
            address ,
            name    ,
            contact ,    
        )

        return user
}
const signIn = async(username, password)=>{        
    const user = await userDao.getUserDao(username)
    if (!user) throw {status: 400, message: 'invalid username'}
    
    const hashPassword = await bcrypt.compare(password, user.password)
    if (hashPassword == false) throw {status: 400, message: 'invalid password'}
    else{
        const token = await signToken(user.id)
        
        return token
    }
}
module.exports={
    checkEmail,
    checkUsername,
    signUp,
    signIn,
}