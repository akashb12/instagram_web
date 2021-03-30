import { Request, Response } from "express";
import {Reply} from "../DataBase/Models/Reply"
import {Comment} from "../DataBase/Models/Comment"
import {Post} from "../DataBase/Models/Post"
// add likes
module.exports.addReply = async function (req: any, res: Response) {
  try {
    const insertData = await Reply.query().insert({
      post_id: req.params.postId,
      user_id: req.user.id,
      comment_id: req.params.commentId,
      reply: req.body.reply,
    });
    return res.status(200).send({
      status: true,
      message: "reply added",
      insertData,
    });
  } catch (error) {
    console.log(error)
    return res.status(400).send({
      status: false,
      error,
    });
  }
};

// edit reply
module.exports.editReply = async function (req: any, res: Response) {
  const { reply } = req.body;

  try {
    const replies = await Reply.query().findById(req.params.id);
    if (replies.user_id === req.user.id) {
      const editReply = await Reply.query()
        .findById(req.params.id)
        .patch({
          reply: replies.reply,
        });
      return res.status(200).send({
        status: true,
        message: "reply updated",
        editReply,
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

// delete reply

module.exports.removeReply = async function (req: any, res: Response) {
  try {
    const post = await Post.query().findById(req.params.postId);
    const replies = await Reply.query().findById(req.params.replyId);
    if (post.user_id === req.user.id) {
      const removeData = await Reply.query().deleteById(req.params.replyId);
      return res.status(200).send({
        status: true,
        message: "reply removed",
        removeData,
      });
    } else if (replies.user_id === req.user.id) {
      const removeData = await Comment.query().deleteById(req.params.replyId);
      return res.status(200).send({
        status: true,
        message: "reply removed",
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

// get all replies
module.exports.getReplies = async function (req: any, res: Response) {
  try {
    const replies = await Reply.query()
      .select("*")
      .where("commentId", "=", req.params.id)
      .withGraphFetched("user");
    return res.status(200).send({
      status: true,
      replies,
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      error,
    });
  }
};
