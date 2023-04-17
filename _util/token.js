const jwt = require("jsonwebtoken");

const generateToken = (payload) =>
   jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

const getTokenFromHeader = (headers) => {
   const { authorization } = headers;

   if (!authorization) return null;
   else return authorization.split(" ")[1];
};

const decodedToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = {
   generateToken,
   getTokenFromHeader,
   decodedToken,
};