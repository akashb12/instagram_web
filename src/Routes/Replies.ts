import express from 'express';
const router = express.Router();
const replyController = require("../Controllers/Replies.Controller")
import auth from '../MiddleWare/Auth'


// add like
router.post("/addReply/:postId/:commentId", auth, replyController.addReply);

module.exports = router;