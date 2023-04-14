"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pacientes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      /* Doctores y Usuarios (1:N) */
      Pacientes.belongsTo(models.Usuarios, {
        as: "usuario",
        foreignKey: "id_usuario", // foreignKey de Doctores
      });
    }
  }
  Pacientes.init(
    {
      id_usuario: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Pacientes",
      tableName: "pacientes",
    }
  );
  return Pacientes;
};
