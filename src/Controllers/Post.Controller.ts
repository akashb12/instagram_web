import { Request, Response } from "express";
//const User = require("../DataBase/Models/User");
import { Post } from "../DataBase/Models/Post";
import { SavedPosts } from "../DataBase/Models/SavedPosts";
import { Following } from "../DataBase/Models/Following";
import { Like } from "../DataBase/Models/Like";
import multer from "multer";
const fs = require("fs");

interface Followings {
  id: number;
  user_id: number;
  following_id: number;
}

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
    callback(null, `posts/${Date.now()}_${file.originalname}`);
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

// post images
module.exports.addPostImages = async function (req: Request, res: Response) {
  upload(req, res, (err: any) => {
    if (err) {
      console.log(err);
      return res.json({ status: false, err });
    }
    return res.json({ status: true, image: req.file.path });
  });
};

// add post

module.exports.addPost = async function (req: Request, res: Response) {
  const {
    caption,
    attachment_url,
    tagged_users,
    commentsEnabled,
    archive,
    userId,
  } = req.body;
  try {
    const insertData = await Post.query().insert({
      caption: caption,
      attachment_url: attachment_url,
      tagged_users: tagged_users,
      comments_enabled: commentsEnabled,
      archive: archive,
      user_id: userId,
    });
    return res.status(200).send({
      status: true,
      message: "post added",
      insertData,
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      error,
    });
  }
};
// edit post
module.exports.editPost = async function (req: Request, res: Response) {
  const { caption, tagged_users } = req.body;

  try {
    const post = await Post.query().findById(req.params.id);
    const editPost = await Post.query()
      .findById(req.params.id)
      .patch({
        caption: caption ? caption : post.caption,
        tagged_users: tagged_users ? tagged_users : post.tagged_users,
      });
    return res.status(200).send({
      status: true,
      message: "post updated",
      editPost,
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      error,
    });
  }
};

// save post
module.exports.savePost = async function (req: any, res: Response) {
  const savedPosts = await SavedPosts.query().findOne({
    post_id: req.params.id,
    user_id: req.user.id,
  });
  console.log(savedPosts);
  try {
    if (savedPosts) {
      const removeData = await SavedPosts.query().deleteById(savedPosts.id);
      return res.status(200).send({
        status: true,
        removed: true,
        removeData,
      });
    } else {
      const insertData = await SavedPosts.query().insert({
        post_id: req.params.id,
        user_id: req.user.id,
      });
      return res.status(200).send({
        status: true,
        added: true,
        insertData,
      });
    }
  } catch (error) {
    return res.status(400).send({
      status: false,
      error,
    });
  }
};

// unsave
module.exports.unSavePost = async function (req: any, res: Response) {
  try {
    const removeData = await SavedPosts.query().deleteById(req.params.id);
    return res.status(200).send({
      status: true,
      message: "post unsaved",
      removeData,
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      error,
    });
  }
};

// get my posts
module.exports.getFeeds = async function (req: Request, res: Response) {
  try {
    const ids: number[] = [];
    const following = await Following.query()
      .select("*")
      .where("user_id", "=", req.params.id);
    const getIds = async (following: Followings[]) => {
      following.map(async (item) => {
        ids.push(item.following_id);
      });
    };
    await getIds(following);
    const posts = await Post.query()
      .select("*")
      .whereIn("user_id", ids)
      .withGraphFetched("comments.[user]")
      .withGraphFetched("likes.[user]")
      .withGraphFetched("user")
      .withGraphFetched("saved_posts")
      .select([Post.relatedQuery("likes").count().as("likesCount")]);
    return res.status(200).send({
      status: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      status: false,
      error,
    });
  }
};

// get my posts
module.exports.getPostDetails = async function (req: Request, res: Response) {
  try {

    const post = await Post.query().findOne({id:req.params.id})
      .withGraphFetched("comments.[user]")
      .withGraphFetched("likes.[user]")
      .withGraphFetched("user")
    return res.status(200).send({
      status: true,
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      status: false,
      error,
    });
  }
};

// get saved posts
module.exports.getSavedPosts = async function (req: Request, res: Response) {
  try {
    const allPosts = await SavedPosts.query()
      .select("*")
      .where("user_id", "=", req.params.id)
      .withGraphFetched("posts");
    return res.status(200).send({
      status: true,
      allPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      status: false,
      error,
    });
  }
};

// enable/disable comments
module.exports.toggleComments = async function (req: Request, res: Response) {
  try {
    const post = await Post.query().findById(req.params.id);
    const toggleComments = await Post.query().findById(req.params.id).patch({
      comments_enabled: !post.comments_enabled,
    });
    return res.status(200).send({
      status: true,
      toggleComments,
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      error,
    });
  }
};

// archive
module.exports.archive = async function (req: Request, res: Response) {
  try {
    const post = await Post.query().findById(req.params.id);
    const archive = await Post.query().findById(req.params.id).patch({
      archive: !post.archive,
    });
    return res.status(200).send({
      status: true,
      archive,
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      error,
    });
  }
};

// delete post
module.exports.deletePost = async function (req: any, res: Response) {
  try {
    const post = await Post.query().findById(req.params.id);
    if (post.user_id === req.user.id) {
      const removeData = await Post.query().deleteById(req.params.id);
      return res.status(200).send({
        status: true,
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
