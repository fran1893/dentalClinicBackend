const { sendErrorResponse } = require("../_util/sendResponse");

const isAdmin = (req, res, next) => {
  const { user_role } = req;

  if (user_role != 2) {
    return sendErrorResponse(res, 403, "Dont have permission");
  } else next();
};

module.exports = isAdmin;
