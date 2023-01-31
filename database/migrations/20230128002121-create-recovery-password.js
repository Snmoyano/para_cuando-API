'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'recoveryPassword',
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
          },
          user_id: {
            type: Sequelize.UUID,
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
            type: Sequelize.BOOLEAN,
            defaultValue: false
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
      await queryInterface.dropTable('recoveryPassword', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
