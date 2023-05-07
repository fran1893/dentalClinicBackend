const { Usuarios, Citas, Pacientes, Doctores, Centro } = require("../models");

const {
  sendSuccsessResponse,
  sendErrorResponse,
} = require("../_util/sendResponse");
const { hash } = require("../_util/hash");
const { getPagesFromCountLimit, normalizePage } = require("../_util/util");
const { user } = require("../config/global");

const LIMIT = user.paginationLimit;

const userController = {};

// MOSTRAR LOS DATOS DEL USUARIO AL USUARIO MEDIANTE SU PK
userController.getProfile = async (req, res) => {
  try {
    const id_usuario = req.user_id;
    const user = await Usuarios.findByPk(id_usuario, {
      attributes: {
        exclude: ["id", "password", "id_rol", "createdAt", "updatedAt"],
      },
    });
    return sendSuccsessResponse(res, 200, user);
  } catch (error) {
    return sendErrorResponse(res, 500, "Error retreiving user data", error);
  }
};

// ACTUALIZAR EL PERFIL
userController.updateProfile = async (req, res) => {
  try {
    const id_usuario = req.user_id;
    let newPassword;
    if (req.body.password) {
      newPassword = hash(req.body.password);
      console.log(newPassword);
    }
    const updateProfile = await Usuarios.update(
      {
        ...req.body,
        password: newPassword,
        id_rol: 1,
      },
      { where: { id: id_usuario } }
    );
    if (updateProfile == 1) {
      return sendSuccsessResponse(res, 200, {
        success: true,
        message: "Updated profile",
      });
    } else {
      return sendErrorResponse(res, 400, "User not found");
    }
  } catch (error) {
    return sendErrorResponse(res, 500, "Error updating profile", error);
  }
};

// MOSTRAR LAS CITAS DEL PACIENTE
userController.getAppointmentsByPatient = async (req, res) => {
  try {
    const paciente = await Pacientes.findOne({
      where: { id_usuario: req.user_id },
    });

    const appointments = await Citas.findAll({
      where: { id_paciente: paciente.id },
      attributes: {
        exclude: [, "createdAt", "updatedAt"],
      },
      include: {
        model: Centro,
        attributes: {
          exclude: ["id", "createdAt", "updatedAt"],
        },
      },
    });

    if (appointments.length > 0) {
      return sendSuccsessResponse(res, 200, {
        message: "Here are your appointments",
        appointments,
      });
    } else {
      return sendErrorResponse(res, 404, "Dont have appointments");
    }
  } catch (error) {
    return sendErrorResponse(
      res,
      500,
      "Error getting your appointments",
      error
    );
  }
};

// VER TODAS LAS CITAS DEL DOCTOR
userController.getAllAppointmentsByDoctor = async (req, res) => {
  try {
    const doctor = await Doctores.findOne({
      where: { id_usuario: req.user_id },
    });

    const appointments = await Citas.findAll({
      where: { id_paciente: doctor.id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: Centro,
        attributes: {
          exclude: ["id", "createdAt", "updatedAt"],
        },
      },
    });
    if (appointments.length > 0) {
      return sendSuccsessResponse(res, 200, {
        message: "Here are your appointments",
        appointments: appointments,
      });
    } else {
      return sendErrorResponse(res, 404, "Dont have appointments");
    }
  } catch (error) {
    return sendErrorResponse(
      res,
      500,
      "Error getting your appointments",
      error
    );
  }
};

// MOSTRAR TODOS LOS PACIENTES (ADMIN)
userController.getAllPatients = async (req, res) => {
  let { page } = req.query;
  try {
    const count = await Pacientes.count();
    const pages = getPagesFromCountLimit(count, LIMIT);
    page = normalizePage(page, pages);

    const patients = await Pacientes.findAll({
      limit: LIMIT,
      offset: (page - 1) * LIMIT,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: Usuarios,
        attributes: {
          exclude: ["id", "password", "id_rol", "createdAt", "updatedAt"],
        },
      },
    });

    return sendSuccsessResponse(res, 200, {
      info: {
        total_results: count,
        limit_results: patients.length,
        page: page,
        total_pages: pages,
      },
      results: patients,
    });
  } catch (error) {
    return sendErrorResponse(
      res,
      500,
      "Error retrieving all the patients",
      error
    );
  }
};

// MOSTRAR TODOS LOS DOCTORES (ADMIN)
userController.getAllDoctors = async (req, res) => {
  let { page } = req.query;
  try {
    const count = await Doctores.count();
    const pages = getPagesFromCountLimit(count, LIMIT);
    page = normalizePage(page, pages);

    const doctors = await Doctores.findAll({
      limit: LIMIT,
      offset: (page - 1) * LIMIT,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: Usuarios,
        as: "Doctor",
        attributes: {
          exclude: ["id", "password", "id_rol", "createdAt", "updatedAt"],
        },
      },
    });
    return sendSuccsessResponse(res, 200, {
      info: {
        total_results: count,
        limit_results: doctors.length,
        page: page,
        total_pages: pages,
      },
      results: doctors,
    });
  } catch (error) {
    return sendErrorResponse(
      res,
      500,
      "Error retrieving all the doctors",
      error
    );
  }
};

module.exports = userController;
