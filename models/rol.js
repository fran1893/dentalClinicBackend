"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Roles.hasMany(models.Usuario, {
        foreignKey: "id_rol", // foreignKey en modelo Usuario
      });
    }
  }
  Roles.init(
    {
      nombre_rol: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Roles",
      tableName: "roles",
    }
  );
  return Roles;
};
