const { Pacientes } = require("../models");
const { sendErrorResponse } = require("../_util/sendResponse");

const isPatient = async (req, res, next) => {
  try {
    const patient = await Pacientes.findOne({
      where: { id_usuario: req.user_id },
    });

    if (!patient) {
      return sendErrorResponse(res, 403, "Dont have permissions");
    }

    req.id_paciente = patient.id;

    next();
  } catch (error) {
    return sendErrorResponse(res, 500, "Error verifying user", error);
  }
};

module.exports = isPatient;
