import { Request, Response } from "express";
import { User } from "../DataBase/Models/User";
import { Follower } from "../DataBase/Models/Follower";
import { Following } from "../DataBase/Models/Following";
import { Requests } from "../DataBase/Models/Request";
// add follow
module.exports.addFollower = async function (req: any, res: Response) {
    try {
        const user = await User.query().findById(req.params.followToId);
    if(user.is_private===true){
        const insertData = await Requests.query().insert({
            user_id: req.params.followToId,
            request_id: req.params.followById,
          });
          return res.status(200).send({
            status: true,
            message: "requested",
            insertData,
          });
    }
    else{
        const insertFollower = await Follower.query().insert({
            user_id: req.params.followToId,
            follower_id: req.params.followById,
          });
          const insertFollowing = await Following.query().insert({
            user_id: req.params.followById,
            following_id: req.params.followToId,
          });
          return res.status(200).send({
            status: true,
            message: "followed",
          });
    }
    } catch (error) {
        return res.status(400).send({
            status: false,
            error
          });
    }

};

// accept request
module.exports.acceptRequest = async function (req: any, res: Response) {
    try {
        const insertFollower = await Follower.query().insert({
            user_id: req.params.requestFor,
            follower_id: req.params.requestBy,
          });
          const insertFollowing = await Following.query().insert({
            user_id: req.params.requestBy,
            following_id: req.params.requestFor,
          });
            const removeData = await Requests.query().deleteById(req.params.requestId)
            return res.status(200).send({
                status: true,
                message: "accepted",
              });
    } catch (error) {
        return res.status(400).send({
            status: false,
            error
          });
    }

};

// reject request
module.exports.rejectRequest = async function (req: any, res: Response) {
  try {
          const removeData = await Requests.query().deleteById(req.params.id)
          return res.status(200).send({
              status: true,
              message: "rejected",
            });
  } catch (error) {
      return res.status(400).send({
          status: false,
          error
        });
  }

};

// unfollow
module.exports.unFollow = async function (req: any, res: Response) {
    try {
      const removeFollower = await Follower.query().deleteById(req.params.id)
      const removeFollowing = await Following.query().deleteById(req.params.id)
      return res.status(200).send({
          status: true,
          message: "unfollowed",
        });
    } catch (error) {
        return res.status(400).send({
            status: false,
            error
          });
    }

};


// get all requests
module.exports.getAllRequests = async function (req: any, res: Response) {
  try {
    const getAllRequests = await Requests.query()
    .select("*")
    .where("user_id", "=", req.params.id)
    .withGraphFetched("user");
    return res.status(200).send({
        status: true,
        getAllRequests
      });
  } catch (error) {
      return res.status(400).send({
          status: false,
          error
        });
  }

};
