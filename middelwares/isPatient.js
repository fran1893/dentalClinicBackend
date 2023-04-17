const { Patient } = require("../models");
const { sendErrorResponse } = require("../_util/sendResponse");

const isPatient = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({
      where: { user_id: req.user_Id },
    });

    if (!patient) {
      return sendErrorResponse(res, 403, "Dont have permissions");
    }

    req.id_paciente = patient.id;

    next();
  } catch (error) {
    return sendErrorResponse(res,500,"Error verifying user", error)
  }
};

module.exports = isPatient;
