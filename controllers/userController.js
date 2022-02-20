const bcrypt = require('bcrypt');
const db = require('../models');
const validate = require('../core/validator');
const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../config/config.js').SECRET_KEY;
const ALGORITHM = require('../config/config.js').ALGORITHM;

module.exports={
    checkEmail: (req, res)=>{
        if(!req.body)return res.status(400).json({message: 'BODY_NOT_EXIST'})

        db.User.findOne({where: {email: req.body.email}})
            .then(result=>{
                if(result){
                    return res.status(400).json({message: 'EMAIL_EXIST'})
                }
                else{
                    return res.status(200).json({message: 'EMAIL_NOT_EXIST'})
                }
            })
    },
    checkUsername: (req, res)=>{
        if(!req.body)return res.status(400).json({message: 'BODY_NOT_EXIST'})

        db.User.findOne({where: {username: req.body.username}})
            .then(result=>{
                if(result){
                    return res.status(400).json({message: 'EMAIL_EXIST'})
                }
                else{
                    return res.status(200).json({message: 'EMAIL_NOT_EXIST'})
                }
            })
    },
    signUp: async(req, res)=>{
        try{
            if(!req.body)return res.status(400).json({message: 'BODY_NOT_EXIST'})

            validate.validates_email(req.body.email)
            validate.validates_password(req.body.password)
            validate.validates_username(req.body.username)
            
            db.User.create({
                username : req.body.username,
                email    : req.body.email,
                password : await bcrypt.hash(req.body.password, 12),
                address  : req.body.address,
                name     : req.body.name,
                contact  : req.body.contact
            }).then(result=>{
                if(result){
                    return res.status(201).json({
                        message: 'CREATED'
                    })
                }
            }).catch(err=>{
                return res.status(400).json({
                    message: 'NOT_CREATED'
                })
            })
        }
        catch (err){
            return res.status(400).json({
                message: err.message
            })
        }
    },
    signIn: async(req, res)=>{
        if(!req.body)return res.status(400).json({message: 'BODY_NOT_EXIST'})
        console.log(req.body.username)
        const user = await db.User.findOne({where: {username: req.body.username}})
        console.log(user)
        if (!user)return res.status(400).json({message: 'INVALID_USERNAME'})
        
        const hashPassword = await bcrypt.compare(req.body.password, user.password)
        if (hashPassword == false)return res.status(400).json({message: 'INVALID_PASSWORD'})
        else{
            const token = jwt.sign({id:user.id}, SECRET_KEY, {algorithm:ALGORITHM});
            return res.status(200).json({
                message: 'SUCCESS',
                token: token
            })
        }
    }
}