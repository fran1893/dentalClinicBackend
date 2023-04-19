const express = require("express");
const router = express.Router();

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const appointmentRouter = require("./routes/appointment");

/* home page */
router.use("/", indexRouter);

/* authentication */
router.use("/auth", authRouter);
// /* users */
router.use("/users", userRouter);
// /* appointment */
router.use("/appointment", appointmentRouter);

module.exports = router;
