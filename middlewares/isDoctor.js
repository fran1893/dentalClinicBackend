const { sendErrorResponse } = require("../_util/sendResponse");
const isDoctor = async (req, res, next) => {
  const { user_role } = req;

  if (user_role != "doctor") {
    return sendErrorResponse(res, 403, "Dont have permission");
  } else next();
};

module.exports = isDoctor;
