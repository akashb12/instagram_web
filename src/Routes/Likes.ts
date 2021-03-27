import express from 'express';
const router = express.Router();
const likeController = require("../Controllers/Likes.Controller")
import auth from '../MiddleWare/Auth'


// add like
router.post("/addLike/:id", auth, likeController.addLike);



// get likes
router.post("/getLikes/:id", auth, likeController.getLikes);

module.exports = router;