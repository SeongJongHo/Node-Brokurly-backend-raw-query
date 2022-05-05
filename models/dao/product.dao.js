const db = require('../sequelize');

const getProductsDao = async(menu, category)=>{
    return await db.sequelize.query(
        `
        SELECT * 
        FROM products AS p
        INNER JOIN categories AS c 
        ON (c.id IN (${category}) AND c.id = p.category_id )
        INNER JOIN menus AS m 
        ON (m.id IN (${menu}) AND m.id = c.menu_id )
        LEFT OUTER JOIN images AS i
        ON p.id = i.product_id 
        `
    )
}
const getProductDao = async(id)=>{
    return await db.sequelize.query(
        `
        SELECT * 
        FROM products AS p
        INNER JOIN categories AS c 
        ON (c.id = p.category_id )
        INNER JOIN menus AS m 
        ON (m.id = c.menu_id )
        LEFT OUTER JOIN images AS i
        ON p.id = i.product_id 
        WHERE p.id = ${id}
        `
    )
}
module.exports = {
    getProductsDao,
    getProductDao
}