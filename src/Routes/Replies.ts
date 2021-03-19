import express from "express";
const router = express.Router();
const replyController = require("../Controllers/Replies.Controller");
import auth from "../MiddleWare/Auth";

// add reply
router.post("/addReply/:postId/:commentId", auth, replyController.addReply);

// edit reply
router.post("/editReply/:id", auth, replyController.editReply);

// delete reply
router.post("/removeReply/:postId/:replyId", auth, replyController.removeReply);

// get replies
router.post("/getReplies/:id", auth, replyController.getReplies);
module.exports = router;
