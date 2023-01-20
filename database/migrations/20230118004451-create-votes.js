'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'votes',
        {
          id: {
            // usando Serial
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.BIGINT, // Puede ser Integer o BigInt -> BigInt es mejor
          },
          // publication_id: {
          //   type: Sequelize.UUID,
          //   foreignKey: true,
          //   references: {
          //     model: 'publications',
          //     key: 'id',
          //   },
          //   onUpdate: 'CASCADE',
          //   onDelete: 'CASCADE',
          // },
          // profile_id: {
          //   type: Sequelize.UUID,
          //   foreignKey: true,
          //   references: {
          //     model: 'profiles',
          //     key: 'id',
          //   },
          //   onUpdate: 'CASCADE',
          //   onDelete: 'CASCADE',
          // },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            field: 'created_at',
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            field: 'updated_at',
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
      await queryInterface.dropTable('votes', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
