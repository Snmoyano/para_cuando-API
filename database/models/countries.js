'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Countries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Countries.belongsTo(models.Profiles, {
        foreignKey: 'id',
        // targetKey: 'country_id',
      })
      Countries.belongsTo(models.Cities, {
        foreignKey: 'id',
        // targetKey: 'country_id',
      })

      Countries.belongsTo(models.State, {
        foreignKey: 'id',
        // targetKey: 'country_id',
      })
    }
  }
  Countries.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Countries',
      tableName: 'countries',
      underscored: true,
      timestamps: true,
    }
  )
  return Countries
}
