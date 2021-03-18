import { Request, Response } from "express";
const Comment = require("../DataBase/Models/Comment");
const Post = require("../DataBase/Models/Post");
// add likes
module.exports.addComment = async function (req: any, res: Response) {
  try {
    const insertData = await Comment.query().insert({
      postId: req.params.id,
      userId: req.user.id,
      comment: req.body.comment,
    });
    return res.status(200).send({
      status: true,
      message: "comment added",
      insertData,
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      error,
    });
  }
};

// remove comment
module.exports.removeComment = async function (req: any, res: Response) {
  try {
    const post = await Post.query().findById(req.params.postId);
    const comment = await Comment.query().findById(req.params.commentId);
    if (post.userId === req.user.id) {
      const removeData = await Comment.query().deleteById(req.params.commentId);
      return res.status(200).send({
        status: true,
        message: "comment removed",
        removeData,
      });
    } else if (comment.userId === req.user.id) {
      const removeData = await Comment.query().deleteById(req.params.commentId);
      return res.status(200).send({
        status: true,
        message: "comment removed",
        removeData,
      });
    } else {
      return res.status(400).send({
        status: false,
      });
    }
  } catch (error) {
    return res.status(400).send({
      status: false,
      error,
    });
  }
};

//   get all comments

module.exports.getComments = async function (req: any, res: Response) {
  try {
    const comments = await Comment.query()
      .select("*")
      .where("postId", "=", req.params.id)
      .withGraphFetched("user");
    return res.status(200).send({
      status: true,
      comments,
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      error,
    });
  }
};
