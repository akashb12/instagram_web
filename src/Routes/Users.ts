import express from 'express';
const router = express.Router();
const userController = require("../Controllers/User.Controller")

// register user
router.post("/register", userController.register)

module.exports = router;