const { sendErrorResponse } = require("../_util/sendResponse");

const isPatient = async (req, res, next) => {
  const { user_role } = req;

  if (user_role != "user") {
    return sendErrorResponse(res, 403, "Dont have permission");
  } else next();
};

module.exports = isPatient;
