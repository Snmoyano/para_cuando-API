//migration de users creada por sequelize-cli y editada por nosotros
'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'users',
        {
          id: {
            // usando Serial
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.BIGINT, // Puede ser Integer o BigInt -> BigInt es mejor
          },
          first_name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          last_name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
              isEmail: true
            }
          },
          username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          email_verified: {
            type: Sequelize.DATE,
          },
          token: {
            type: Sequelize.STRING,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            field: 'created_at', // --> Asegurense de establecer el campo en snake_case aquí
            // o usando created_at en vez de createdAt en el Key
            defaultValue: new Date()
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            field: 'updated_at',
            defaultValue: new Date()
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
      await queryInterface.dropTable('users', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
