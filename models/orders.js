const Sequelize = require('sequelize');

module.exports = class Order extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      order_number: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      order_status_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'order_status',
          key: 'id'
        }
      },
      user_id: {
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
      tableName: 'orders',
      underscored: true,
      timestamps: false,
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    })
  }
  static associate(db){
    this.belongsTo(db.OrderStatus, {foreignKey: "order_status_id", onDelete: 'cascade', targetKey: 'id'});
    this.belongsTo(db.User, {foreignKey: "user_id", onDelete: 'cascade', targetKey: 'id'});
  }
}