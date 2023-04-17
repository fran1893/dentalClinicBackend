const sendSuccsessResponse = (res, code, data) => res.status(code).json(data);

const sendErrorResponse = (res, code, message, error = null) => {
   res.status(code).json({
      status: "error",
      message,
      error: error?.toString(),
   });
};

module.exports = {
   sendSuccsessResponse,
   sendErrorResponse,
};