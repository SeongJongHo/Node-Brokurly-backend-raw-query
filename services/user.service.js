const bcrypt = require('bcrypt');
const {userDao} = require('../models/dao');
const validate = require('../utils/validator.util');
const {signToken} = require('../utils/token.util')

const checkEmail = async(email)=>{
    const user = await userDao.checkEmailUserDao(email)

    if(user[0][0]) throw {status:400, message: 'email exist'}
    
    return user[0][0]??'email not exist'
}
const checkUsername = async(username)=>{
    const user = await userDao.getUserDao(username)
    
    if(user[0][0]) throw {status:400, message: 'username exist'}
    
    return user[0][0]??'username not exist'
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

        password = await bcrypt.hash(password, 12)

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
    if (!user[0][0]) throw {status: 400, message: 'invalid username'}
    
    const hashPassword = await bcrypt.compare(password, user[0][0].password)
    if (hashPassword == false) throw {status: 400, message: 'invalid password'}
    else{
        console.log(user)
        const token = await signToken(user[0][0].id)
        
        return token
    }
}
module.exports={
    checkEmail,
    checkUsername,
    signUp,
    signIn,
}