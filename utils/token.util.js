const token = jwt.sign({id:user.id}, SECRET_KEY, {algorithm:ALGORITHM});

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