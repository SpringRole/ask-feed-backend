const express = require("express");

const router = express.Router();

const {
  signup,
  verifyAccount,
  resetlink,
  changepassword,
  login,
  updateProfile,
} = require("../controllers/auth");

router.post("/signup", signup);
router.post("/activate/:token", verifyAccount);
router.post("/resetlink", resetlink);
router.post("/changepassword/:token", changepassword);
router.post("/login", login);
router.put("/updateprofile", updateProfile);

module.exports = router;
