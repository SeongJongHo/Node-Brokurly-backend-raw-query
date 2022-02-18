const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: "email"
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      contact: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: "username"
      },
      password: {
        type: Sequelize.STRING(250),
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
      tableName: 'users',
      underscored: true,
      timestamps: false,
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    })
  }
  static associate(db){
    this.hasMany(db.Cart, { foreignKey: 'user_id', sourceKey: 'id'});
    this.hasMany(db.Order, { foreignKey: 'user_id', sourceKey: 'id'});
  }
}