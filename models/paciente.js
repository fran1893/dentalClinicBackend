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
      /* Pacientes y Usuarios (1:1) */
      Pacientes.belongsTo(models.Usuarios, {
        foreignKey: "id_doctor", // foreignKey de Doctores
      });
      Pacientes.belongsToMany(models.Doctores, { through: 'Citas', foreignKey: 'id_paciente'});;
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
