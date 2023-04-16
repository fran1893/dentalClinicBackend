"use strict";
const { Op } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("roles", [
      { nombre_rol: "paciente", createdAt: new Date(), updatedAt: new Date() },
      { nombre_rol: "doctor", createdAt: new Date(), updatedAt: new Date() },
      { nombre_rol: "admin", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", {
      [Op.or]: [
        { nombre_rol: "paciente" },
        { nombre_rol: "doctor" },
        { nombre_rol: "admin" },
      ],
    });
  },
};
