import { Request, Response } from "express";
import { User } from "../DataBase/Models/User";
import { Follower } from "../DataBase/Models/Follower";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
const fs = require("fs");
import { config } from "../Config/key";
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
module.exports.auth = async function (req: any, res: Response) {
  res.status(200).json({
    status: true,
    id: req.user.id,
    full_name: req.user.full_name,
    username: req.user.username,
    is_private: req.user.isPrivate,
    email: req.user.email,
    profileImage: req.user.profileImage,
    bio: req.user.bio,
  });
};

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
          is_private: isPrivate,
        });
        return res.status(200).send({
          status: true,
          message: "user added",
        });
      }
    } catch (error) {
      return res.status(400).send({
        status: false,
        error: error,
      });
    }
  }
};

// login user
module.exports.login = async function (req: Request, res: Response) {
  const { email, password } = req.body;
  const users = await User.query().findOne({ email: email });
  if (!users) {
    return res.status(400).send({
      status: false,
      message: "user not found",
    });
  }
  try {
    const isMatch = bcrypt.compare(password, users.password);
    if (!isMatch) {
      return res.status(400).json({
        status: false,
        message: "password entered is incorrect",
      });
    }
    const token = jwt.sign({ id: users.id }, config.JWT_SECRET, {
      expiresIn: 3600,
    });
    return res.status(200).json({
      status: true,
      message: "login Successful",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: false,
      error: error,
    });
  }
};

// change password
module.exports.changePassword = async function (req: any, res: Response) {
  console.log(req.user);
  const { oldPassword, newPassword } = req.body;
  try {
    const isMatch = await bcrypt.compare(oldPassword, req.user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: false,
        message: "password entered is incorrect",
      });
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(newPassword, salt);
    const changePassword = await User.query().findById(req.user.id).patch({
      password: hash,
    });

    return res.status(200).json({
      status: true,
      message: "password changed",
    });
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
        profile_image: image ? image : req.user.profileImage,
        bio: bio ? bio : req.user.bio,
        is_private: isPrivate,
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
  console.log("target", req.params.targetId, "myid", req.params.myId);
  try {
    const user = await User.query()
      .findById(req.params.targetId)
      .withGraphFetched("posts")
      .select([
        User.ref("*"),
        User.relatedQuery("posts").count().as("postCount"),
        User.relatedQuery("followers").count().as("followerCount"),
        User.relatedQuery("following").count().as("followingCount"),
      ]);
    const getProfileDetails = await Follower.query()
      .select("*")
      .where("user_id", "=", req.params.targetId)
      .andWhere("follower_id", "=", req.params.myId);

    if (req.params.targetId === req.params.myId) {
      return res.status(200).send({
        status: true,
        name: user.username,
        profileImage: user.profile_image,
        bio: user.bio,
        postCount: user.postCount,
        followers: user.followerCount,
        following: user.followingCount,
        posts: user.posts,
      });
    } else {
      if (user.is_private === true) {
        if (getProfileDetails.length) {
          return res.status(200).send({
            status: true,
            name: user.username,
            profileImage: user.profile_image,
            bio: user.bio,
            postCount: user.postCount,
            followers: user.followerCount,
            following: user.followingCount,
            posts: user.posts,
            message: "following",
          });
        } else {
          return res.status(200).send({
            status: false,
            name: user.username,
            bio: user.bio,
            profileImage: user.profile_image,
            postCount: user.postCount,
            followers: user.followerCount,
            following: user.followingCount,
            message: "not following",
          });
        }
      } else {
        if (getProfileDetails.length) {
          return res.status(200).send({
            status: true,
            name: user.username,
            profileImage: user.profile_image,
            bio: user.bio,
            postCount: user.postCount,
            followers: user.followerCount,
            following: user.followingCount,
            posts: user.posts,
            message: "following",
          });
        } else {
          return res.status(200).send({
            status: false,
            name: user.username,
            profileImage: user.profile_image,
            postCount: user.postCount,
            followers: user.followerCount,
            following: user.followingCount,
            posts: user.posts,
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
