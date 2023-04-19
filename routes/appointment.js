const appointmentController = require("../controllers/appointmentController");
const isPatient = require("../middlewares/isPatient");
// const isDoctor = require("../middlewares/isDoctor");
const verifyToken = require("../middlewares/verifyToken");

const router = require("express").Router();

router.post(
  "/patient",
  verifyToken,
  isPatient,
  appointmentController.createAppointment
);
router.delete(
  "/:id",
  verifyToken,
  isPatient,
  appointmentController.deleteAppointment
);
router.put(
  "/:id",
  verifyToken,
  isPatient,
  appointmentController.updateAppointment
);

module.exports = router;
