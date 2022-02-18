const Sequelize = require('sequelize');

module.exports = class OrderStatus extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      status: {
        type: Sequelize.STRING(50),
        allowNull: false
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
      tableName: 'order_status',
      underscored: true,
      timestamps: false,
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    })
  }
  static associate(db){
    this.hasMany(db.Order, {foreignKey: "order_status_id", sourceKey: 'id'});
  }
}