const express = require("express");
const { createUser, login } = require("../../controllers/user");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);
router.get("/user");

module.exports = router;
