const express = require("express");
const {
  createUser,
  loginUserController,
  getAllUsers,
} = require("../controller/user.controller");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserController);
router.get("/all-users", getAllUsers);


module.exports = router;
