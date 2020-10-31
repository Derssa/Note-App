const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");

router.post("/register", userCtrl.registerUser);

router.post("/login", userCtrl.loginUser);

router.get("/verify", userCtrl.verifiedUser);

module.exports = router;
