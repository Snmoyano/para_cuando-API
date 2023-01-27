'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tags.belongsToMany(models.Publications, {
        as: 'tags',
        through: models.PublicationsTags,
        foreignKey: 'tag_id',
      })
    }
  }
  Tags.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
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
      modelName: 'Tags',
      tableName: 'tags',
      underscored: true,
      timestamps: true,
    }
  )
  return Tags
}
