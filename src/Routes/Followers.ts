import express from "express";
const router = express.Router();
const followersController = require("../Controllers/Followers.Controller");
import auth from "../MiddleWare/Auth";

// add follow
router.post("/addFollower/:followToId/:followById", auth, followersController.addFollower);

// accept request
router.post("/acceptRequest/:requestFor/:requestBy/:requestId", auth, followersController.acceptRequest);

// reject request
router.post("/rejectRequest/:id", auth, followersController.rejectRequest);

// unfollow
router.post("/unFollow/:id", auth, followersController.unFollow);

// unfollow
router.post("/getAllRequests/:id", auth, followersController.getAllRequests);

module.exports = router;
