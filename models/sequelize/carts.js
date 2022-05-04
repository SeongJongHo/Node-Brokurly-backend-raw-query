const Sequelize = require('sequelize');

module.exports = class Cart extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      product_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false
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
      tableName: 'carts',
      underscored: true,
      timestamps: false,
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    })
  }
  static associate(db){
    this.belongsTo(db.User, {foreignKey : 'user_id', onDelete: 'cascade', targetKey: 'id' })
    this.belongsTo(db.Product, {foreignKey : 'product_id', onDelete: 'cascade', targetKey: 'id' })
  }
}