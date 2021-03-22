import { Request, Response, NextFunction } from "express";
const User = require("../DataBase/Models/User");

async function auth(req: any, res: any, next: any) {
  let token = req.body.token;
  if (token === undefined) {
    token = req.query.token;
  }
  try {
    const users = await User.query().findOne({ token: token });
    if (users) {
      req.token = token;
      req.user = users;
      next();
    } else {
      return res.json({
        status: false,
      });
    }
  } catch (error) {
    return res.json({
      status: false,
      error: error,
    });
  }
}

export default auth;
