const { Doctores } = require("../models");
const { sendErrorResponse } = require("../_util/sendResponse");
const isDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctores.findOne({
      where: { id_usuario: req.user_id },
    });

    if (!doctor) {
      return sendErrorResponse(res, 403, "Dont have permissions");
    }

    req.id_doctor = doctor.id;

    next();
  } catch (error) {
    return sendErrorResponse(res, 500, "Error verifying user", error);
  }
};

module.exports = isDoctor;
