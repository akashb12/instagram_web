import { Request, Response } from "express";
const Like = require("../DataBase/Models/Like");
const fs = require("fs");
// add likes
module.exports.addLike = async function (req: Request, res: Response) {
console.log(req.params)
};