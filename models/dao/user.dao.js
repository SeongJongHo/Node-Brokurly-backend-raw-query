const db = require('../models/sequelize');

const checkEmailUserDao = async(email)=>{
    return await db.sequelize.query(
        `
        SELECT email
        FROM users
        WHERE email = ${email}
        `
    )
}

const getUserDao = async(username)=>{
    return await db.sequelize.query(
        `
        SELECT username, password
        FROM users
        WHERE username = ${username}
        `
    )
}
const addUserDao = async(
    username,
    email   ,
    password,
    address ,
    name    ,
    contact ,)=>{
        return await db.sequelize.query(
            `
            INSERT INTO users(username, email, password, address, name, contact)
            VALUES (${username}, ${email}, ${password}, ${address}, ${name}, ${contact})
            `
        )
}

module.exports={
    addUserDao,
    getUserDao,
    checkEmailUserDao,
}