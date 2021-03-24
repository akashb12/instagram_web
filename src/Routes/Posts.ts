import express from "express";
const router = express.Router();
const postController = require("../Controllers/Post.Controller");
import auth from "../MiddleWare/Auth";

// add post images
router.post("/addPostImages", auth, postController.addPostImages);

// add post
router.post("/addPost", auth, postController.addPost);

// edit post
router.post("/editPost/:id", auth, postController.editPost);

// save posts
router.post("/savePost/:id", auth, postController.savePost);

// unsave posts
router.post("/unsavePost/:id", auth, postController.unSavePost);

// get my posts
router.post("/getFeeds/:id", auth, postController.getFeeds);

// get saved posts
router.post("/getSavedPosts/:id", auth, postController.getSavedPosts);

//archive
router.post("/archive/:id", auth, postController.archive);

// toggle comments
router.post("/toggleComments/:id", auth, postController.toggleComments);

//archive
router.post("/archive/:id", auth, postController.archive);

// delete post
router.post("/deletePost/:id", auth, postController.deletePost);

module.exports = router;
