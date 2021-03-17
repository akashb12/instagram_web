import { Request, Response } from "express";
const User = require("../DataBase/Models/User");
const Post = require("../DataBase/Models/Post");
import multer from "multer";
const fs = require("fs");
const config = require("../Config/key");

// multer configuration
const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void
  ) {
    callback(null, "./uploads");
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void
  ) {
    callback(null, `/posts/${Date.now()}_${file.originalname}`);
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

const upload = multer({ storage: storage, fileFilter: fileFilter }).array(
  "file"
);

// register user
module.exports.addPost = async function (req: Request, res: Response) {
    upload(req, res, (err: any) => {
        if (err) {
          console.log(err)
          return res.json({ status: false, err });
        }
        return res.json({ status: true, image: req.files });
      });
};
