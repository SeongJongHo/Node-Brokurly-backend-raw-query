'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const db = {
  Cart            : require('./carts'),
  Category        : require('./categories'),
  Image           : require('./images'),
  Menu            : require('./menus'),
  OrderItem       : require('./order_items'),
  OrderItemStatus : require('./order_item_status'),
  OrderStatus     : require('./order_status'),
  Order           : require('./orders'),
  Product         : require('./products'),
  User            : require('./users'),
  sequelize       : sequelize,
  Sequelize       : Sequelize
}

db.Menu.init(sequelize)
db.Category.init(sequelize)   
db.Product.init(sequelize) 
db.Image.init(sequelize)        
db.User.init(sequelize)     
db.OrderStatus.init(sequelize)            
db.Order.init(sequelize)   
db.OrderItemStatus.init(sequelize)
db.OrderItem.init(sequelize)      
db.Cart.init(sequelize)

db.User.associate(db)
db.Cart.associate(db)           
db.Category.associate(db)       
db.Image.associate(db)          
db.Menu.associate(db)           
db.OrderItem.associate(db)    
db.OrderItemStatus.associate(db)
db.OrderStatus.associate(db)    
db.Order.associate(db)          
db.Product.associate(db)        
              

module.exports = db;
