import { Request, Response } from "express";
const Like = require("../DataBase/Models/Like");
// add likes
module.exports.addLike = async function (req: any, res: Response) {
  try {
    const insertData = await Like.query().insert({
      postId: req.params.id,
      userId: req.user.id,
    });
    return res.status(200).send({
      status: true,
      message: "post liked",
      insertData,
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      error,
    });
  }
};

// unlike
module.exports.removeLike = async function (req: any, res: Response) {
  try {
    const removeData = await Like.query().deleteById(req.params.id);
    return res.status(200).send({
      status: true,
      message: "like removed",
      removeData,
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      error,
    });
  }
};

// get all likes for a post

module.exports.getLikes = async function (req: any, res: Response) {
  try {
    const likes = await Like.query()
      .select("*")
      .where("postId", "=", req.params.id)
      .withGraphFetched("user");
    return res.status(200).send({
      status: true,
      likes,
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      error,
    });
  }
};
