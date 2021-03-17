import express from 'express';
const router = express.Router();
const postController = require("../Controllers/Post.Controller")
import auth from '../MiddleWare/Auth'


// change password
router.post("/addPost", auth, postController.addPost);

module.exports = router;