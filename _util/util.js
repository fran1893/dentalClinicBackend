const global = require("../config/global");

const getPagesFromCountLimit = (count, limit) => Math.ceil(count / limit);
const normalizePage = (page, max) => {
  page = +page || 1;

  if (page < 1) page = 1;
  else if (page > max) page = max;

  return page;
};

const isPasswordValidLength = (password) =>
  password.length >= global.user.passwordMinLength;

module.exports = {
  getPagesFromCountLimit,
  normalizePage,
  isPasswordValidLength,
};
