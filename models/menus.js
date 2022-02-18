const Sequelize = require('sequelize');

module.exports = class Menu extends Sequelize.Model{
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
      tableName: 'menus',
      underscored: true,
      timestamps: false,
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    })
  }
  static associate(db){
    this.hasMany(db.Category, {foreignKey : 'menu_id', sourceKey: 'id' })
  }
}
//역참조가  hasmany 참조가 belongsto
