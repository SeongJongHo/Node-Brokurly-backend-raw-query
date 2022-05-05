const db = require('../sequelize');

const checkEmailUserDao = async(email)=>{
    return await db.sequelize.query(
        `
        SELECT *
        FROM users
        WHERE email = '${email}'
        `
    ).catch((e)=> {
        throw {status:500, message:e.message}
    })
}

const getUserDao = async(username)=>{
    return await db.sequelize.query(
        `
        SELECT username, password
        FROM users
        WHERE username = '${username}'
        `
    ).catch((e)=> {
        throw {status:500, message:e.message}
    })
}
const getAuthUserDao = async(id)=>{
    return await db.sequelize.query(
        `
        SELECT username, password
        FROM users
        WHERE id = ${id}
        `
    ).catch((e)=> {
        throw {status:500, message:e.message}
    })
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
            VALUES ('${username}', '${email}', '${password}', '${address}', '${name}', '${contact}')
            `
        ).catch((e)=> {
            throw {status:500, message:e.message}
        })
}

module.exports={
    addUserDao,
    getUserDao,
    checkEmailUserDao,
    getAuthUserDao,
}