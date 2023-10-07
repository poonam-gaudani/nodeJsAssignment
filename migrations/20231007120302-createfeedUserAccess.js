'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('feedUserAccess',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        }
        ,
        user_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "users"
          },
          allowNull: false
        },
        feed_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "feeds"
          },
          allowNull: false
        },
        is_deleted: { type: Sequelize.BOOLEAN, default: false, allowNull: true },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        }
      },
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('feedUserAccess');
  }
};
