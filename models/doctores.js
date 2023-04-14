"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      /* Doctores y Usuarios (1:N) */
      Doctores.belongsTo(models.Usuarios, {
        as: "usuario",
        foreignKey: "id_usuario", // foreignKey de Doctores
      });
    }
  }
  Doctores.init(
    {
      id_usuario: DataTypes.INTEGER,
      activo: DataTypes.ENUM("si", "no"),
      especializacion: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Doctores",
    }
  );
  return Doctores;
};
