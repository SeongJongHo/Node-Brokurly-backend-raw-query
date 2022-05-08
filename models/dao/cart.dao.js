const db = require('../sequelize');


const getCartDao = async(userId)=>{
    return await db.sequelize.query(
        `SELECT c.id, user_id, c.product_id, quantity, p.name, p.price, i.url
         FROM carts AS c
         INNER JOIN products AS p ON (p.id = product_id)
         INNER JOIN images AS i ON (i.product_id = p.id)
         WHERE user_id = ${userId}`).catch((e)=> {
            throw {status:500, message:e.message}
        })
}

const addCartDao = async(userId, productId, quantity)=>{
    return await db.sequelize.query(
        `
        INSERT INTO carts (quantity, user_id, product_id)
        VALUES (${quantity}, ${userId}, ${productId})
        ON DUPLICATE KEY
        UPDATE quantity = quantity + ${quantity}
        `).catch((e)=> {
            throw {status:500, message:e.message}
        })
    // ALTER TABLE carts ADD UNIQUE KEY(product_id, user_id) 두개 컬럼을 묶어서 유니크
}

const updateCartDao = async(userId, cartId, quantity)=>{
    return await db.sequelize.query(
        `
        UPDATE carts
        SET quantity = ${quantity}
        WHERE id = ${cartId} AND user_id = ${userId}
        `
    ).catch((e)=> {
        throw {status:500, message:e.message}
    })
}

const deleteCartDao = async(userId, cartId)=>{
    return await db.sequelize.query(
        `
        DELETE 
        FROM carts
        WHERE id IN (${cartId}) AND user_id = ${userId}
        `
    ).catch((e)=> {
        throw {status:500, message:e.message}
    })
}

module.exports={
    getCartDao,
    addCartDao,
    deleteCartDao,
    updateCartDao,
}