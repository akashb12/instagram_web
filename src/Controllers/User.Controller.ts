import { Request, Response } from "express";
const User = require("../DataBase/Models/User");
const Follower = require("../DataBase/Models/Follower");
const Following = require("../DataBase/Models/Following");
const Post = require("../DataBase/Models/Post");
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
const fs = require("fs");
const config = require("../Config/key");
const saltRounds: number = 10;

// multer configuration
const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void
  ) {
    callback(null, "uploads/");
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void
  ) {
    callback(null, `profiles/${Date.now()}_${file.originalname}`);
  },
});
const fileFilter = (req: Request, file: Express.Multer.File, callback: any) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    callback(null, true);
  } else {
    callback(new Error("Image uploaded is not of type jpg/jpegor png"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
  "file"
);


// auth
module.exports.auth =async function (req:any,res:Response){
  res.status(200).json({
    status:true,
    id: req.user.id,
    full_name:req.user.full_name,
    username:req.user.username,
    isPrivate:req.user.isPrivate,
    email:req.user.email,
    profileImage:req.user.profileImage
});
}

// register user
module.exports.register = async function (req: Request, res: Response) {
  const { fullName, email, password, dob, userName, isPrivate } = req.body;
  const users = await User.query().findOne({ email: email });
  if (users) {
    return res.status(200).json({
      status: false,
      alreadyRegistered: true,
    });
  } else {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);
      if (hash) {
        const insertData = await User.query().insert({
          full_name: fullName,
          email: email,
          password: hash,
          dob: dob,
          username: userName,
          isPrivate: isPrivate,
        });
        return res.status(200).send({
          status: true,
          message: "user added",
        });
      }
    } catch (error) {
      return res.status(400).send({
        status: false,
        error: error.name,
      });
    }
  }
};

// login user
module.exports.login = async function (req: Request, res: Response) {
  const { email, password } = req.body;
  const users = await User.query().findOne({ email: email });
  if (users) {
    try {
      const isMatch = bcrypt.compare(password, users.password);
      if (isMatch) {
        const token = jwt.sign({ id: users.id }, config.JWT_SECRET, {
          expiresIn: 3600,
        });
        const addToken = await User.query().findById(users.id).patch({
          token: token,
        });
        return res.status(200).json({
          status: true,
          message: "login Successful",
          token,
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "password entered is incorrect",
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: false,
        error: error,
      });
    }
  } else {
    return res.status(400).send({
      status: false,
      message: "user not found",
    });
  }
};

// change password
module.exports.changePassword = async function (req: any, res: Response) {
  console.log(req.user);
  const { oldPassword, newPassword } = req.body;
  try {
    const isMatch = await bcrypt.compare(oldPassword, req.user.password);
    if (isMatch) {
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(newPassword, salt);
      const changePassword = await User.query().findById(req.user.id).patch({
        password: hash,
      });

      return res.status(200).json({
        status: true,
        message: "password changed",
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "password entered is incorrect",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: error,
    });
  }
};

// update profile
module.exports.updateProfilePicture = async function (
  req: Request,
  res: Response
) {
  upload(req, res, (err: any) => {
    if (err) {
      console.log(err);
      return res.json({ status: false, err });
    }
    return res.json({ status: true, image: req.file });
  });
};

// // update profile
module.exports.updateUserDetails = async function (req: any, res: Response) {
  const { fullName, bio, image, isPrivate } = req.body;
  try {
    const updateUserDetails = await User.query()
      .findById(req.user.id)
      .patch({
        full_name: fullName ? fullName : req.user.full_name,
        profileImage: image ? image : req.user.profileImage,
        bio: bio ? bio : req.user.bio,
        isPrivate: isPrivate ? isPrivate : req.user.isPrivate,
      });
    if (updateUserDetails) {
      return res.status(200).json({
        status: true,
        message: "user updated",
      });
    }
  } catch (error) {
    return res.status(400).json({ status: false, error });
  }
};

// search user
module.exports.searchUser = async function (req: any, res: Response) {
  const { name } = req.body;
  try {
    const users = await User.query().where("username", "like", `%${name}%`);
    return res.status(200).json({ status: true, users });
  } catch (error) {
    return res.status(400).json({ status: false, error });
  }
};

// get profile
module.exports.getProfile = async function (req: any, res: Response) {
  console.log("target",req.params.targetId,"myid",req.params.myId)
  try {
    const user = await User.query().findById(req.params.targetId);

    const getProfileDetails = await Follower.query()
      .select("*")
      .where("user_id", "=", req.params.targetId)
      .andWhere("follower_id", "=", req.params.myId);

    const followers = await Follower.query()
      .select("*")
      .where("user_id", "=", req.params.targetId);

    const following = await Following.query()
      .select("*")
      .where("user_id", "=", req.params.targetId);

    const posts = await Post.query()
      .select("*")
      .where("userId", "=", req.params.targetId)
      .andWhere("archive", "=", false);

    if(req.params.targetId === req.params.myId){
      return res.status(200).send({
        status: true,
        name:user.username,
        profileImage:user.profileImage,
        followers: followers.length,
        following: following.length,
        posts: posts,
      });
    }
    else{
      if (user.isPrivate === true) {
        if (getProfileDetails.length) {
          return res.status(200).send({
            status: true,
            name:user.username,
            profileImage:user.profileImage,
            followers: followers.length,
            following: following.length,
            posts: posts,
            message: "following",
          });
        } else {
          return res.status(200).send({
            status: false,
            name:user.username,
            profileImage:user.profileImage,
            followers: followers.length,
            following: following.length,
            message: "not following",
          });
        }
      } else {
        if (getProfileDetails.length) {
          return res.status(200).send({
            status: true,
            name:user.username,
            profileImage:user.profileImage,
            followers: followers.length,
            following: following.length,
            posts: posts,
            message: "following",
          });
        } else {
          return res.status(200).send({
            status: false,
            name:user.username,
            profileImage:user.profileImage,
            followers: followers.length,
            following: following.length,
            posts: posts,
            message: "not following",
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      status: false,
      error,
    });
  }
};

// DELETE USER
module.exports.deleteUser = async function (req: any, res: Response) {
  try {
    const user = await User.query().findById(req.user.id);
    if (user) {
      const removeData = await User.query().deleteById(req.user.id);
      return res.status(200).send({
        status: true,
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
