"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("citas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_doctor: {
        type: Sequelize.INTEGER,
        references: {
          model: "doctores",
          key: "id",
        },
      },
      id_paciente: {
        type: Sequelize.INTEGER,
        references: {
          model: "pacientes",
          key: "id",
        },
      },
      id_centro: {
        type: Sequelize.INTEGER,
        references: {
          model: "centro",
          key: "id",
        },
      },
      fecha: {
        type: Sequelize.DATEONLY,
      },
      horario: {
        type: Sequelize.TIME,
      },
      tratamiento: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("citas");
  },
};
