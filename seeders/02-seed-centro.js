"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "centros",
      [
        {
          nombre_lugar: "Clinica Barcelona",
          direccion: "Gran via 576",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre_lugar: "Clinica Madrid",
          direccion: "C. de Juan de Mariana 15",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre_lugar: "Clinica Valencia",
          direccion: "Av. de Catalunya 11",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("centros", {
      [Op.or]: [
        {
          nombre_lugar: "Clinica Barcelona",
        },
        {
          nombre_lugar: "Clinica Madrid",
        },
        {
          nombre_lugar: "Clinica Valencia",
        },
      ],
    });
  },
};
