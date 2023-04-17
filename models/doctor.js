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
      /* Doctores y Usuarios (1:1) */
      Doctores.belongsTo(models.Usuarios, {
        foreignKey: "id_usuario", // foreignKey de Doctores
      });
      Doctores.belongsToMany(models.Pacientes, { through: 'Citas', foreignKey: 'id_doctor'});
    }
  }
  Doctores.init(
    {
      id_usuario: DataTypes.INTEGER,
      activo: DataTypes.ENUM("si", "no"),
    },
    {
      sequelize,
      modelName: "Doctores",
      tableName: "doctores"
    }
  );
  return Doctores;
};
