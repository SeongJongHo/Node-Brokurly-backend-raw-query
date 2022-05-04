const db = require('../sequelize');


const getCartDao = async(userId)=>{
    return await db.sequelize.query(
        `SELECT c.id, user_id, c.product_id, quantity, p.name, p.price, i.url
         FROM carts AS c
         INNER JOIN products AS p ON (p.id = product_id)
         INNER JOIN images AS i ON (i.product_id = p.id)
         WHERE user_id = ${userId}`)
}

const addCartDao = async(userId, productId, quantity)=>{
    return await db.sequelize.query(
        `
        INSERT INTO carts (quantity, user_id, product_id)
        VALUES (${quantity}, ${productId}, ${userId})
        ON DUPLICATE KEY
        UPDATE quantity = quantity + ${quantity}
        `)
    // ALTER TABLE carts ADD UNIQUE KEY(product_id, user_id) 두개 컬럼을 묶어서 유니크
}

const updateCartDao = async(cartId, quantity)=>{
    return await db.sequelize.query(
        `
        UPDATE INTO carts
        SET quantity = ${quantity}
        WHERE id = ${cartID}
        `
    )
}

const deleteCartDao = async()=>{
    return await db.sequelize.query(
        `
        DELETE 
        FROM carts
        WHERE id IN = (${cartID})
        `
    )
}

module.exports={
    getCartDao,
    addCartDao,
    deleteCartDao,
    updateCartDao,
}