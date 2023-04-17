"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      /* Usuarios y Roles (1:N) */
      Usuarios.belongsTo(models.Rol, {
        as: "roles",
        foreignKey: "id_rol", // foreignKey de Usuarios
      });
      Usuarios.hasOne(models.Doctor, {
        foreignKey: "id_usuario", // foreignKey de Doctores
      });

      Usuarios.hasOne(models.Paciente, {
        foreignKey: "id_usuario", // foreignKey de Pacientes
      });
    }
  }
  Usuarios.init(
    {
      nombre: {
        type: DataTypes.STRING,
        validate: {
          is: /^[a-zA-Z]+(([',.-][a-zA-Z ])?[a-zA-Z]*)*$/,
        },
      },
      apellidos: {
        type: DataTypes.STRING,
        validate: {
          is: /^[a-zA-Z]+(([',.-][a-zA-Z ])?[a-zA-Z]*)*$/,
        },
      },
      edad: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: {
            msg: "Debe ser un número entero",
          },
          min: {
            msg: "La edad debe ser mayor que 1",
            args: 1,
          },
          max: 100,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true, isLowercase: true },
      },
      telefono: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: true,
          isInt: {
            msg: "El número telefónico tiene que ser entero",
          },
          len: [9],
        },
      },
      password: { type: DataTypes.STRING },
      id_roles: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Usuarios",
      tableName: "usuarios",
    }
  );
  return Usuarios;
};
