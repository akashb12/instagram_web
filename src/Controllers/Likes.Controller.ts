import { Request, Response } from "express";
import { Like } from "../DataBase/Models/Like";
// add likes
module.exports.addLike = async function (req: any, res: Response) {
  const likes = await Like.query().findOne({post_id:req.params.id,user_id:req.user.id})
  if(likes){
    const removeData = await Like.query().deleteById(likes.id);
    return res.status(200).send({
      status: true,
      removed:true,
      removeData,
    });
  }
  try {
    const insertData = await Like.query().insert({
      post_id: req.params.id,
      user_id: req.user.id,
    });
    return res.status(200).send({
      status: true,
      added: true,
      insertData,
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
      .where("post_id", "=", req.params.id)
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
