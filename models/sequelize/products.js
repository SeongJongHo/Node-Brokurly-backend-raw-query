// models/products.js

const Sequelize = require('sequelize');

module.exports = class Product extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      introduction: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      unit: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      shipping: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      package: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      origin: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      weight: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      category_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('now()')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('now()')
      }
    }, {
      sequelize,
      tableName: 'products',
      underscored: true,
      timestamps: false,
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    })
  }
  static associate(db){
    
    this.belongsTo(db.Category, {foreignKey: "category_id", onDelete: 'cascade', targetKey: "id"});
    this.hasMany(db.Cart, {foreignKey: "product_id", onDelete: 'cascade', sourceKey: "id"});
    this.hasMany(db.Image, {foreignKey: "product_id", onDelete: 'cascade', sourceKey: "id"});
    this.hasMany(db.OrderItem, {foreignKey: "product_id", onDelete: 'cascade', sourceKey: "id"});
  }
}