const express = require("express");
const router = express.Router();

const indexRouter = require("./routes/index");
// const alumnosRouter = require("./routes/alumnos");
//const nacionalidadesRouter = require("./routes/nacionalidades");

/* home page */
router.use("/", indexRouter);

module.exports = router;
