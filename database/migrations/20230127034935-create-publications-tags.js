'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'publicationsTags',
        {
          // id: {
          //   allowNull: false,
          //   autoIncrement: true,
          //   primaryKey: true,
          //   type: Sequelize.INTEGER,
          // },
          tag_id: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false,
            references: {
              model: 'profiles',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          publication_id: {
            type: Sequelize.UUID,
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
            type: Sequelize.DATE,
            field: 'created_at',
            defaultValue: new Date(),
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            field: 'updated_at',
            defaultValue: new Date(),
          },
        },
        { transaction }
      )
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropTable('publicationsTags', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
