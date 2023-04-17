const userController = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");
const isDoctor = require("../middlewares/isDoctor");
const isAdmin = require("../middlewares/isAdmin");
const isPatient = require("../middlewares/isPatient");

const router = require("express").Router();

router.get("/profile", verifyToken, userController.getProfile);
router.put("/profile/update", verifyToken, userController.updateProfile);
router.get(
  "/profile/checkallpatients",
  verifyToken,
  isAdmin,
  userController.getAllPatients
);
router.get(
    "/profile/checkalldoctors",
    verifyToken,
    isAdmin,
    userController.getAllDoctors
  );
router.get(
  "/appointments/checkall",
  verifyToken,
  isPatient,
  userController.getAppointmentsByPatient
);
router.get(
  "/appointments/checkall/doctor",
  verifyToken,
  isDoctor,
  userController.getAllAppointmentsByDoctor
);

module.exports = router;
