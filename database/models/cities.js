'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Cities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cities.belongsTo(models.Countries, { foreignKey: 'id' })
      Cities.belongsTo(models.Publications, {
        foreignKey: 'id',
        // targetKey: 'city_id',
      })

      Cities.belongsTo(models.State, {
        foreignKey: 'id',
        // targetKey: 'city_id',
      })
    }
  }
  Cities.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
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
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Cities',
      tableName: 'cities',
      underscored: true,
      timestamps: true,
    }
  )
  return Cities
}
