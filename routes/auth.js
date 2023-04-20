const authController = require("../controllers/authController");
const isAdmin = require("../middlewares/isAdmin");
const verifyToken = require("../middlewares/verifyToken");

const router = require("express").Router();

router.post("/register", authController.register);
router.post(
  "/register/doctor",
  verifyToken,
  isAdmin,
  authController.registerDoctor
);
router.post("/login", authController.login);

module.exports = router;
