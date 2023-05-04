"use strict";
const { Op } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "doctores",
      [
        {
          id_usuario: 4,
          activo: "si",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_usuario: 5,
          activo: "si",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("doctores", {
      [Op.or]: [{ id_usuario: 4 }, { id_usuario: 5 }],
    });
  },
};
