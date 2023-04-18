"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Citas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Citas.belongsTo(models.Centro, {
        foreignKey: "id_centro",
      });
    }
  }
  Citas.init(
    {
      id_doctor: DataTypes.INTEGER,
      id_paciente: DataTypes.INTEGER,
      id_centro: DataTypes.INTEGER,
      fecha: DataTypes.DATE,
      horario: DataTypes.TIME,
      tratamiento: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Citas",
      tableName: "citas"
    }
  );
  return Citas;
};
