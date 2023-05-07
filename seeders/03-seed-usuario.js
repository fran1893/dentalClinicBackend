"use strict";
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "usuarios",
      [
        {
          nombre: "Luis",
          apellidos: "Suarez",
          edad: 19,
          email: "bolso@gmail.com",
          telefono: 616540798,
          password: bcrypt.hashSync("12345678", 10),
          id_rol: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Diego",
          apellidos: "Forlan",
          edad: 35,
          email: "diego@gmail.com",
          telefono: 615679798,
          password: bcrypt.hashSync("12345678", 10),
          id_rol: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Francisco",
          apellidos: "Diaz",
          edad: 29,
          email: "pancho@gmail.com",
          telefono: 618560718,
          password: bcrypt.hashSync("12345678", 10),
          id_rol: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Alberto",
          apellidos: "Mendez",
          edad: 45,
          email: "alberto@gmail.com",
          telefono: 616744498,
          password: bcrypt.hashSync("12345678", 10),
          id_rol: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Gilberto",
          apellidos: "Mendez",
          edad: 48,
          email: "gilberto@gmail.com",
          telefono: 616744489,
          password: bcrypt.hashSync("12345678", 10),
          id_rol: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("usuarios", {
      [Op.or]: [
        {
          nombre: "Luis",
        },
        {
          nombre: "Francisco",
        },
        {
          nombre: "Alberto",
        },
        {
          nombre: "Diego",
        },
        {
          nombre: "Gilberto",
        },
      ],
    });
  },
};
