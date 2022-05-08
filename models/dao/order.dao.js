const db = require('../sequelize');
const uuid = require('uuid').v4;
const orderStatus= {
    WAIT_DEPOSIT       : 1,   
    COMPLETION_DEPOSIT : 2,    
    READY_RELEASE      : 3,  
    SHIPMENT_COMPLETE  : 4,
    DELIVERED          : 5,
    DELAYED_DELIVERY   : 6,
    DELIVERY_COMPLETED : 7,
    ORDER_COMPLETE     : 8,
    ORDER_CANCELLATION : 9
}

const getOrderDao = async(user)=>{
    // GROUP_CONCAT
    // return await db.sequelize.query(
    //     `
    //     SELECT *
    //     FROM orders AS o
    //     INNER JOIN order_status AS os
    //     ON (os.id = o.order_status_id)
    //     LEFT OUTER JOIN order_items AS oi
    //     ON (oi.order_id = o.id)
    //     INNER JOIN order_item_status AS ois
    //     ON (ois.id = oi.order_items_status_id)
    //     INNER JOIN products AS p
    //     ON (p.id = oi.product_id)
    //     LEFT OUTER JOIN images AS i
    //     ON (i.product_id = p.id)
    //     WHERE o.users_id = ${user}
    //     `
    // ).catch((e)=> {
    //     throw {status:500, message:e.message}
    // })
    // return await db.sequelize.query(
    //     `
    //     SELECT o.id, o.order_number, os.status,
    //     GROUP_CONCAT(p.id, p.name , p.price ,ois.status) AS productInfo
    //     FROM orders AS o
    //     INNER JOIN order_status AS os
    //     ON (os.id = o.order_status_id)
    //     INNER JOIN order_items AS oi
    //     ON (oi.order_id = o.id)
    //     INNER JOIN order_item_status AS ois
    //     ON (ois.id = oi.order_items_status_id)
    //     INNER JOIN products AS p
    //     ON (p.id = oi.product_id)
    //     LEFT OUTER JOIN images AS i
    //     ON (i.product_id = p.id)
    //     WHERE o.users_id = ${user}
    //     GROUP BY o.id, o.order_number, os.status
    //     `
    // ).catch((e)=> {
    //     throw {status:500, message:e.message}
    // })
    return await db.sequelize.query(
        `
        SELECT o.id, o.order_number, os.status,
        GROUP_CONCAT(p.id SEPARATOR '|') AS productId,
        GROUP_CONCAT(p.name SEPARATOR '|') AS productName,
        GROUP_CONCAT(p.price SEPARATOR '|') AS productPrice,
        GROUP_CONCAT(ois.status SEPARATOR '|') AS itemStatus
        FROM orders AS o
        INNER JOIN order_status AS os
        ON (os.id = o.order_status_id)
        INNER JOIN order_items AS oi
        ON (oi.order_id = o.id)
        INNER JOIN order_item_status AS ois
        ON (ois.id = oi.order_items_status_id)
        INNER JOIN products AS p
        ON (p.id = oi.product_id)
        LEFT OUTER JOIN images AS i
        ON (i.product_id = p.id)
        WHERE o.users_id = ${user}
        GROUP BY o.id, o.order_number, os.status
        `
    ).catch((e)=> {
        throw {status:500, message:e.message}
    })
}
const addOrderDao = async(user, cart_id, t)=>{

        const cart = await db.sequelize.query(
            `
            SELECT * 
            FROM carts
            WHERE id IN (${cart_id})
            `,{ transaction: t }
        ).catch(()=> {
            throw {status:500, message:'cart1'}
        })
        
        await db.sequelize.query(
            `
            DELETE FROM carts
            WHERE id IN (${cart_id})
            `
            ,{ transaction: t }
        ).catch(()=> {
            throw {status:500, message:'cart2'}
        })
        console.log(user)
        const order = await db.sequelize.query(
            `
            INSERT INTO orders(order_number, order_status_id, users_id)
            VALUES ('${uuid()}', ${orderStatus.WAIT_DEPOSIT}, ${user})
            `
            ,{ transaction: t }
        ).catch((e)=> {
            throw {status:500, message:e.message}
        })

        const orderItem = await cart[0].map(async(item)=>{
            await db.sequelize.query(
                `
                INSERT INTO order_items(product_id, quantity, order_id, order_items_status_id, tracking_number)
                VALUES (${item.product_id}, ${item.quantity}, ${order[0]}, ${orderStatus.WAIT_DEPOSIT}, '${uuid()}')
                `
                ,{ transaction: t }
            ).catch((e)=> {
                throw {status:500, message:e.message}
            })
        })
        await Promise.all(orderItem)
        await t.commit();
        return true

        /* 벌크 insert 하려했으나 오류 발생 해결방안 계속 모색 */
        // await db.sequelize.query(
        //     `
        //     INSERT INTO order_items
        //     (product_id,quantity,order_id,order_items_status_id,tracking_number)
        //     VALUES 
        //     (?,?,?,?,?)
        //     `,orderItem
        //     ,{ transaction: t }
        // ).catch((e)=> {
        //     throw {status:500, message:e.message}
        // })
   
    
}
const updateOrderDao = async(orderItems, status)=>{        
    return await db.sequelize.query(
        `
        UPDATE INTO order_items
        SET order_status_id = ${status}
        WHERE id IN ${orderItems} 
        `
    ).catch((e)=> {
        throw {status:500, message:e.message}
    })
}
module.exports = {
    getOrderDao,
    addOrderDao,
    updateOrderDao,
}