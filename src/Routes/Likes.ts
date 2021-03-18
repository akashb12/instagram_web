import express from 'express';
const router = express.Router();
const likeController = require("../Controllers/Like.Controller")
import auth from '../MiddleWare/Auth'


// add like
router.post("/addLike/:userId/:postId", auth, likeController.addLike);

module.exports = router;