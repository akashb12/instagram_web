import { Request, Response } from "express";
import { Comment } from "../DataBase/Models/Comment";
import { Post } from "../DataBase/Models/Post";
// add comment
module.exports.addComment = async function (req: any, res: Response) {
  try {
    const insertData = await Comment.query()
      .insert({
        post_id: req.params.id,
        user_id: req.user.id,
        comment: req.body.comment,
      })
      .withGraphFetched("user");
    return res.status(200).send({
      status: true,
      message: "comment added",
      insertData,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      status: false,
      error,
    });
  }
};

// edit comment
module.exports.editComment = async function (req: any, res: Response) {
  const { comment } = req.body;

  try {
    const comments = await Comment.query().findById(req.params.id);
    if (comments.user_id === req.user.id) {
      const editComment = await Comment.query().findById(req.params.id).patch({
        comment: comment,
      });
      return res.status(200).send({
        status: true,
        message: "comment updated",
        editComment,
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

// remove comment
module.exports.removeComment = async function (req: any, res: Response) {
  try {
    const post = await Post.query().findById(req.params.postId);
    const comment = await Comment.query().findById(req.params.commentId);
    if (post.user_id === req.user.id) {
      const removeData = await Comment.query().deleteById(req.params.commentId);
      return res.status(200).send({
        status: true,
        message: "comment removed",
        removeData,
      });
    } else if (comment.user_id === req.user.id) {
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
    console.log(error);
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

// get all comments
module.exports.getAllComments = async function (req: Request, res: Response) {
  const { ids } = req.body;
  try {
    if (ids.length) {
      const comments = await Comment.query()
        .select("*")
        .whereIn("postId", ids)
        .withGraphFetched("user");
      return res.status(200).send({
        status: true,
        comments,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      status: false,
      error,
    });
  }
};
