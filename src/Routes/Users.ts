import express from 'express';
const router = express.Router();
const userController = require("../Controllers/User.Controller")
import auth from '../MiddleWare/Auth'

// auth
router.post("/auth", auth, userController.auth);

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


// get profile
router.post("/getProfile/:myId/:targetId", auth, userController.getProfile);

// search user
router.post("/deleteUser", auth, userController.deleteUser);
module.exports = router;