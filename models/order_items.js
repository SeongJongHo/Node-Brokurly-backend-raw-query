const Sequelize = require('sequelize');

module.exports = class OrderItem extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      tracking_number: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      order_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      order_item_status_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      product_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    }, {
      sequelize,
      tableName: 'order_items',
      underscored: true,
      timestamps: false,
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    })
  }
  static associate(db){
    this.belongsTo(db.OrderItemStatus, {foreignKey: "order_item_status_id", onDelete: 'cascade', targetKey: 'id'});
    this.belongsTo(db.Order, {foreignKey: "order_id", onDelete: 'cascade', targetKey: 'id'});
    this.belongsTo(db.Product, {foreignKey: "product_id", onDelete: 'cascade', targetKey: 'id'});
  }
}