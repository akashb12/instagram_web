import express from "express";
const router = express.Router();
const commentController = require("../Controllers/Comments.Controller");
import auth from "../MiddleWare/Auth";

// add like
router.post("/addComment/:id", auth, commentController.addComment);

// edit comment
router.post("/editComment/:id", auth, commentController.editComment);

// remove comments
router.post(
  "/removeComment/:postId/:commentId",
  auth,
  commentController.removeComment
);

// get all comments
router.post("/getComments/:id", auth, commentController.getComments);

module.exports = router;
