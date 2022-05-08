const db = require('../sequelize');

const getProductsDao = async(menu, category)=>{
    return await db.sequelize.query(
        `
        SELECT p.id, p.name, p.introduction, p.price, p.created_at, i.url
        FROM products AS p
        INNER JOIN categories AS c 
        ON (c.id IN (${category}) AND c.id = p.category_id )
        INNER JOIN menus AS m 
        ON (m.id IN (${menu}) AND m.id = c.menu_id )
        LEFT OUTER JOIN images AS i
        ON p.id = i.product_id 
        `
    ).catch((e)=> {
        throw {status:500, message:e.message}
    })
}
const getProductDao = async(id)=>{
    return await db.sequelize.query(
        `
        SELECT 
        p.id, p.name, p.price, 
        p.introduction, p.description, p.unit, 
        p.shipping, p.package, p.weight, i.url,
        p.category_id, c.menu_id    
        FROM products AS p
        INNER JOIN categories AS c 
        ON (c.id = p.category_id )
        INNER JOIN menus AS m 
        ON (m.id = c.menu_id )
        LEFT OUTER JOIN images AS i
        ON p.id = i.product_id 
        WHERE p.id = ${id}
        `
    ).catch((e)=> {
        throw {status:500, message:e.message}
    })
}
module.exports = {
    getProductsDao,
    getProductDao
}