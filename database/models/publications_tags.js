'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class PublicationsTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PublicationsTags.init(
    {
      tag_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
        references: {
          model: 'tags',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      publication_id: {
        type: DataTypes.UUID,
        foreignKey: true,
        allowNull: false,
        references: {
          model: 'publications',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
      modelName: 'Publications_tags',
      tableName: 'publications_tags',
      underscored: true,
      timestamps: true,
    }
  )
  return PublicationsTags
}
