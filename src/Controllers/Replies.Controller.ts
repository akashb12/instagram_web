import { Request, Response } from "express";
const Reply = require("../DataBase/Models/Reply");
const Comment = require("../DataBase/Models/Comment");
const Post = require("../DataBase/Models/Post");
// add likes
module.exports.addReply = async function (req: any, res: Response) {
  try {
    const insertData = await Reply.query().insert({
      postId: req.params.postId,
      userId: req.user.id,
      commentId: req.params.commentId,
      reply:req.body.reply
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