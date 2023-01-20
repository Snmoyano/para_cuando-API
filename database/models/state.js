'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      State.hasMany(models.Countries, { foreignKey: 'country_id' })
      State.hasMany(models.Cities, { foreignKey: 'city_id' })
    }
  }
  State.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      country_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        references: {
          model: 'countries',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      city_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        references: {
          model: 'cities',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'State',
      tableName: 'state',
      underscored: true,
      timestamps: true,
    }
  )
  return State
}
