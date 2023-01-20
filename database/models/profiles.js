'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profiles.hasMany(models.Users, { foreignKey: 'id' })
      Profiles.hasMany(models.Roles, { foreignKey: 'id' })
      Profiles.hasOne(models.Countries, { foreignKey: 'id' })
      Profiles.belongsToMany(models.Publications, {
        as: 'profile',
        through: models.Votes,
        uniqueKey: false,
      })
    }
  }
  Profiles.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },

      user_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      role_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        references: {
          model: 'roles',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      image_url: {
        type: DataTypes.STRING,
      },
      code_phone: {
        type: DataTypes.INTEGER,
      },
      phone: {
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
    },
    {
      sequelize,
      modelName: 'Profiles',
      tableName: 'profiles',
      underscored: true,
      timestamps: true,
    }
  )
  return Profiles
}
