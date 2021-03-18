import express from 'express';
const router = express.Router();
const userController = require("../Controllers/User.Controller")
import auth from '../MiddleWare/Auth'

// register user
router.post("/register", userController.register)

// login user
router.post("/login", userController.login)

// change password
router.post("/changePassword", auth, userController.changePassword);

// update profile
router.post("/updateProfilePicture", auth, userController.updateProfilePicture);

// update user details
router.post("/updateUserDetails", auth, userController.updateUserDetails);

// search user
router.post("/searchUser", auth, userController.searchUser);

module.exports = router;