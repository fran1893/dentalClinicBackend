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
          fecha: "2023-04-17",
          horario: "15:45:00",
          tratamiento: "extraer muela del juicio",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_doctor: 2,
          id_paciente: 2,
          id_centro: 3,
          fecha: "2023-05-18",
          horario: "15:45:00",
          tratamiento: "limpieza general",
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
