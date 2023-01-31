'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class RecoveryPassword extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RecoveryPassword.belongsTo(models.Users, { foreignKey: 'user_id' })
    }
  }
  RecoveryPassword.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      user_id: {
        type: DataTypes.UUID,
        foreignKey: true,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      used: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'updated_at',
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      modelName: 'RecoveryPassword',
      tableName: 'recoveryPassword',
      underscored: true,
      timestamps: true,
      defaultScope: {
        attributes: {
          exclude: ['updatedAt', 'createdAt'],
        },
      },
    }
  )
  return RecoveryPassword
}
