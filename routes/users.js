const express = require("express");

const { registerUser } = require("../controllers/ctrl_users");
const { deleteUser } = require("../controllers/ctrl_users");
const { updateUser } = require("../controllers/ctrl_users");
const { userLogin } = require("../controllers/ctrl_users");
const router = express.Router();
router.post("/register", registerUser);
router.delete("/deleteUser", deleteUser);
router.put("/updateUser", updateUser);
router.post("/login", userLogin);
module.exports = router;
