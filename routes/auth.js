const express = require("express");
const router = express.Router();

const {
  signup,
  verifyAccount,
  resetlink,
  changepassword,
  login,
} = require("../controllers/auth");

router.post("/signup", signup);
router.post("/activate/:token", verifyAccount);
router.post("/resetlink", resetlink);
router.post("/changepassword/:token", changepassword);
router.post("/login", login);

module.exports = router;
