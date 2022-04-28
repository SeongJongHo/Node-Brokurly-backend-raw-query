const bcrypt = require('bcrypt');
const db = require('../models');
const validate = require('../utils/validator.util');
const {signToken} = require('../utils/token.util')


module.exports={
    checkEmail: async(email)=>{
        const user = await db.User.findOne({where: {email: email}})
        
        if(user) throw {status:400, message: 'email exist'}
        
        return user??true
    },
    checkUsername: (req, res)=>{
        const user = await db.User.findOne({where: {username: username}})
        
        if(user) throw {status:400, message: 'username exist'}
        
        return user??true
    },
    signUp: async(
        username,
        email   ,
        password,
        address ,
        name    ,
        contact ,)=>{
            validate.validates_email(email)
            validate.validates_password(password)
            validate.validates_username(username)
            
            const user = db.User.create({
                username : username,
                email    : email,
                password : await bcrypt.hash(password, 12),
                address  : address,
                name     : name,
                contact  : contact  
            }).catch(err=>{
                throw {status: 400, message: err.message}
            })

            return user
    },
    signIn: async(username, password)=>{        
        const user = await db.User.findOne({where: {username: username}})
        if (!user) throw {status: 400, message: 'invalid username'}
        
        const hashPassword = await bcrypt.compare(password, user.password)
        if (hashPassword == false) throw {status: 400, message: 'invalid password'}
        else{
            const token = await signToken(user.id)
            
            return token
        }
    }
}