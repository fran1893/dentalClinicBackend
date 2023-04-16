"use strict";
const { Op } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "citas",
      [
        {
          id_doctor: 1,
          id_paciente: 1,
          id_centro: 1,
          fecha: new Date(),
          horario: "15:45:00.0000000",
          tratamiento: "extraer muela del juicio",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("citas", {
      [Op.or]: [{ id_doctor: 1 }],
    });
  },
};
