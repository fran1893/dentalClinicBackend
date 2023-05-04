"use strict";
const { Op } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "pacientes",
      [
        { id_usuario: 1, createdAt: new Date(), updatedAt: new Date() },
        { id_usuario: 2, createdAt: new Date(), updatedAt: new Date() },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("pacientes", {
      [Op.or]: [{ id_usuario: 1 }],
    });
  },
};
