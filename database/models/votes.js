'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Votes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Votes.init(
    {
      id: {
        // usando Serial
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT, // Puede ser Integer o BigInt -> BigInt es mejor
      },
      //   publication_id: {
      //     type: DataTypes.UUID,
      //     foreignKey: true,
      //     references: {
      //       model: 'publications',
      //       key: 'id',
      //     },
      //     onUpdate: 'CASCADE',
      //     onDelete: 'CASCADE',
      //   },
      //   profile_id: {
      //     type: DataTypes.UUID,
      //     foreignKey: true,
      //     references: {
      //       model: 'profiles',
      //       key: 'id',
      //     },
      //     onUpdate: 'CASCADE',
      //     onDelete: 'CASCADE',
      //   },
    },
    {
      sequelize,
      modelName: 'Votes',
      tableName: 'votes',
      underscored: true,
      timestamps: true,
    }
  )
  return Votes
}
