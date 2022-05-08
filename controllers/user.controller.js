const {userService} = require('../services')

const checkEmail = async(req, res)=>{
    try{
        if(!req.body.email) throw {status: 400, message: 'email is necessary'}

        const result = await userService.checkEmail(req.body.email);

        return res.status(200).json({message: 'success', result: result}) 
    }
    catch(err){
        return res.status(err.status || 400).json({message: err.message || 'error'})
    }
}
const checkUsername = async(req, res)=>{
    try{
        if(!req.body.username) throw {status: 400, message: 'username is necessary'}

        const result = await userService.checkUsername(req.body.username);

        return res.status(200).json({message: 'success', result: result}) 
    }
    catch(err){
        return res.status(err.status || 400).json({message: err.message || 'error'})
    }
}
const signUp = async(req, res)=>{
    try{
        if(
            !req.body.username ||
            !req.body.email ||
            !req.body.password ||
            !req.body.address ||
            !req.body.name ||
            !req.body.contact ) throw {status: 400, message: 'user info is necessary'}
        
        const result = await userService.signUp(
            req.body.username,
            req.body.email,
            req.body.password,
            req.body.address,
            req.body.name, 
            req.body.contact
        );

        return res.status(200).json({message: 'success', result: result}) 
    }
    catch(err){
        return res.status(err.status || 400).json({message: err.message || 'error'})
    }
}
const signIn = async(req, res)=>{
    try{
        if(!req.body.username || !req.body.password) throw {status: 400, message: 'username or password necessary'}

        const result = await userService.signIn(req.body.username, req.body.password);

        return res.status(200).json({message: 'success', token: result}) 
    }
    catch(err){
        return res.status(err.status || 400).json({message: err.message || 'error'})
    }
}
module.exports={
    checkEmail,
    checkUsername,
    signUp,
    signIn,
}